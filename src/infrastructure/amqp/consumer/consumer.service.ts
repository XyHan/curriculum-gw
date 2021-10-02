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
import {plainToClass} from "class-transformer";
import {CvType} from "../../../ui/http/graphql/cv/type/cv.type";

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
    await channel.consume(queue, async (msg: ConsumeMessage) => {
        try {
          if (!msg) {
            channel.ack(msg, false);
            return;
          }
          // const titi: string = JSON.parse(msg.content.toString()).name;
          // const toto: string | undefined = titi.split('\\').pop();
          // await this.pubSub.publish('createdCv', { createdCv: msg.content.toString() });
          await this.pubSub.publish('createdCv', { createdCv: plainToClass(CvType, { uuid: 'toto' }) });
          channel.ack(msg, false);
          this.logger.log(`ConsumerService - consume - message: ${msg.content.toString()}`);
        } catch (e) {
          const error = new ConsumerException(e, 'ConsumerService - Error on send message', { msg });
          this.logger.verror(error);
          throw error;
        }
      }
    );
  }
}
