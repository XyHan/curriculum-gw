import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Channel } from 'amqplib';
import { ConsumeMessage } from 'amqplib';
import { ConfigService } from '../../config/config.service';
import { ConnectionService } from '../connect/connection.service';
import { ConsumerInterface } from '../../../domain/amqp/consumer.interface';
import { LoggerVErrorInterface } from '../../logger/logger-v-error.interface';
import { LoggerAdapterService } from '../../logger/logger-adapter.service';
import { ConsumerException } from './consumer.exception';
import { ConnectionInterface } from '../../../domain/amqp/connection.interface';
import { PubSubAdapter, PubSubInterface } from '../../pub-sub/pub-sub.adapter';
import { deserialize } from 'class-transformer';
import { CreatedCvEvent } from '../../../application/event/cv/created-cv.event';
import { UpdatedCvEvent } from '../../../application/event/cv/updated-cv.event';
import { DeletedCvEvent } from '../../../application/event/cv/deleted-cv.event';

@Injectable()
export class ConsumerService extends ConnectionService implements ConsumerInterface, OnModuleInit {
  private channel: Channel;

  constructor(
    @Inject(ConnectionService) protected readonly connectionService: ConnectionInterface,
    @Inject(ConfigService) protected readonly configService: ConfigService,
    @Inject(LoggerAdapterService) protected readonly logger: LoggerVErrorInterface,
    @Inject(PubSubAdapter) private readonly pubSub: PubSubInterface,
  ) {
    super(configService, logger);
  }

  public async onModuleInit(): Promise<void> {
    await this.connect();
    await this.setupChannel();
    await this.consume(this.channel, this.configService.amqpEvent.queue);
  }

  private async setupChannel(): Promise<void> {
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(this.configService.amqpEvent.exchange, 'fanout', { durable: true });
    await this.channel.assertQueue(this.configService.amqpEvent.queue, { autoDelete: false, durable: true });
    await this.channel.bindQueue(this.configService.amqpEvent.queue, this.configService.amqpEvent.exchange, '');
  }

  public async consume(channel: Channel, queue: string): Promise<void> {
    await channel.consume(queue, async (message: ConsumeMessage) => {
        try {
          if (!message) {
            channel.ack(message, false);
            return;
          }
          await this.messageToPubSub(message);
          channel.ack(message, false);
          this.logger.log(`ConsumerService - consume - message: ${message.content.toString()}`);
        } catch (e) {
          const error = new ConsumerException(e, 'ConsumerService - Error on send message', { message });
          this.logger.verror(error);
          throw error;
        }
      }
    );
  }

  public async messageToPubSub(message: ConsumeMessage): Promise<void> {
    const eventName: string | undefined = JSON.parse(message.content.toString())?.name?.split('\\')?.pop();
    if (!eventName) throw new ConsumerException(new Error(), 'ConsumerService - getEventFromMessage - event name not found', { message });

    switch(eventName) {
      case 'CreatedCVEvent':
        return await this.pubSub.publish('createdCv', { createdCv: deserialize(CreatedCvEvent, message.content.toString()) });
      case 'UpdatedCVEvent':
        return await this.pubSub.publish('updatedCv', { updatedCv: deserialize(UpdatedCvEvent, message.content.toString()) });
      case 'DeletedCVEvent':
        return await this.pubSub.publish('deletedCv', { deletedCv: deserialize(DeletedCvEvent, message.content.toString()) });
      default:
        throw new ConsumerException(new Error(), 'ConsumerService - getEventFromMessage - event not found', { message });
    }
  }
}
