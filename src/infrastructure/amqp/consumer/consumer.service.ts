import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Channel } from 'amqplib';
import { ConsumeMessage } from 'amqplib';
import { ConfigService } from '../../config/config.service';
import { deserialize, plainToClass } from 'class-transformer';
import { ConnectionService } from '../connect/connection.service';
import { ConsumerInterface } from '../../../domain/amqp/consumer.interface';
import { LoggerVErrorInterface } from '../../logger/logger-v-error.interface';
import { LoggerAdapterService } from '../../logger/logger-adapter.service';
import { Envelope } from '../envelop/envelope';
import { EnvelopeInterface } from '../../../domain/amqp/envelope.interface';
import { MessageInterface } from '../../../domain/amqp/message.interface';
import { ConsumerException } from './consumer.exception';

const CURRICULUM_EVENT_EXCHANGE = 'ex_curriculum_event';
const CURRICULUM_EVENT_QUEUE = 'q_curriculum_api_to_curriculum_gw_event';

@Injectable()
export class ConsumerService extends ConnectionService implements ConsumerInterface, OnModuleInit {
  private channel: Channel;

  constructor(
    @Inject(ConfigService) protected readonly configService: ConfigService,
    @Inject(LoggerAdapterService) protected readonly logger: LoggerVErrorInterface,
    @Inject(EventBus) private readonly eventBus: EventBus,
  ) {
    super(configService, logger);
  }

  public async onModuleInit(): Promise<void> {
    await this.setupChannel();
    await this.consume(this.channel, CURRICULUM_EVENT_QUEUE);
  }

  private async setupChannel(): Promise<void> {
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(CURRICULUM_EVENT_EXCHANGE, 'fanout', { durable: true });
    await this.channel.assertQueue(CURRICULUM_EVENT_QUEUE, { autoDelete: false, durable: true });
    await this.channel.bindQueue(CURRICULUM_EVENT_QUEUE, CURRICULUM_EVENT_EXCHANGE, '');
  }

  public async consume(channel: Channel, queue: string): Promise<void> {
    await channel.consume(CURRICULUM_EVENT_QUEUE, async (msg: ConsumeMessage) => {
      const message: MessageInterface | null = this.getEventFromMessage(msg, queue);
        try {
          if (!message) {
            channel.ack(msg, false);
            return;
          }
          this.eventBus.publish(message);
          channel.ack(msg, false);
          this.logger.log(`ConsumerService - consume - message: ${msg.content.toString()}`);
        } catch (e) {
          const error = new ConsumerException(e, 'ConsumerService - Error on send message', { message });
          this.logger.verror(error);
          throw error;
        }
      }
    );
  }

  private getEventFromMessage(message: ConsumeMessage, nameQueue: string): MessageInterface | null {
    try {
      const envelope: EnvelopeInterface = deserialize(Envelope, message.content.toString());
      if (!envelope.serializedMessage) {
        this.logger.log(`${nameQueue}: no valid serialized message '${message.content.toString()}'`);
        return null;
      }
      const parsedMessage: any = JSON.parse(envelope.serializedMessage);
      return this.eventMqToAppEventAdapter(parsedMessage);
    } catch (e) {
      this.logger.log(`${nameQueue}: deserialization not possible for message '${message.content.toString()}'`);
      return null;
    }
  }

  private eventMqToAppEventAdapter(event: object): MessageInterface | null {
    if (!event["name"]) return null;

    let eventForBus: MessageInterface | null = null;
    // if (event["name"] === 'MyEvent') {
    //   eventForBus = plainToClass(MyEvent, event);
    // }

    return eventForBus;
  }
}
