import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Channel } from 'amqplib';
import { ConfigService } from '../../config/config.service';
import { PublisherInterface } from '../../../domain/amqp/publisher.interface';
import { PublisherException } from './publisher.exception';
import { LoggerAdapterService } from '../../logger/logger-adapter.service';
import { ConnectionService } from '../connect/connection.service';
import { MessageInterface } from '../../../domain/amqp/message.interface';
import { serialize } from 'class-transformer';
import { ConnectionInterface } from '../../../domain/amqp/connection.interface';
import { ConfigInterface } from '../../config/config.interface';

@Injectable()
export class PublisherService extends ConnectionService implements PublisherInterface, OnModuleInit {
  private channel: Channel;

  constructor(
    @Inject(ConnectionService) protected readonly connectionService: ConnectionInterface,
    @Inject(ConfigService) protected readonly configService: ConfigInterface,
    @Inject(LoggerAdapterService) protected readonly logger: LoggerAdapterService,
  ) {
    super(configService, logger);
  }

  async onModuleInit(): Promise<void> {
    await this.connect();
    await this.setupChannel();
  }

  public async publish(message: MessageInterface): Promise<void> {
    try {
      const options: object = {  delivery_mode:	1, headers: { class: message.name }};
      const bufferedMessage = Buffer.from(serialize(message));
      await this.sendMessage(bufferedMessage, options);
      this.logger.log(`Publisher - Message published: ${bufferedMessage.toString()} - ${Date.now()}`);
    } catch (e) {
      const error = new PublisherException(e, 'PublisherService - Error on send message', { message });
      this.logger.verror(error);
      throw error;
    }
  }

  private async sendMessage(message: Buffer, options: object): Promise<void> {
    await this.channel.publish(this.configService.amqpCommand.exchange, '', message, options);
  }

  private async setupChannel(): Promise<void> {
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(this.configService.amqpCommand.exchange, 'fanout', { durable: true });
    await this.channel.assertQueue(this.configService.amqpCommand.queue, { autoDelete: false, durable: true });
    await this.channel.bindQueue(this.configService.amqpCommand.queue, this.configService.amqpCommand.exchange, '');
  }
}
