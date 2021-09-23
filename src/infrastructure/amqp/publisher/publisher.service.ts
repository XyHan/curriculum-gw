import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Channel } from 'amqplib';
import { ConfigService } from '../../config/config.service';
import { PublisherInterface } from './publisher.interface';
import { PublisherException } from './publisher.exception';
import { LoggerAdapterService } from '../../logger/logger-adapter.service';
import { ConnectionService } from '../connect/connection.service';
import { MessageInterface } from '../../../domain/bus/message';
import { classToPlain } from 'class-transformer';

const CURRICULUM_COMMAND_EXCHANGE = 'ex_curriculum_command';
const CURRICULUM_COMMAND_QUEUE = 'q_curriculum_gw_to_curriculum_api_command';

@Injectable()
export class PublisherService extends ConnectionService implements PublisherInterface, OnModuleInit {
  private channel: Channel;

  constructor(
    @Inject(ConfigService) protected readonly configService: ConfigService,
    @Inject(LoggerAdapterService) protected readonly logger: LoggerAdapterService,
  ) {
    super(configService, logger);
  }

  async onModuleInit(): Promise<void> {
    await this.setupChannel();
  }

  public async publish(message: MessageInterface): Promise<void> {
    try {
      const bufferedMessage = Buffer.from(classToPlain(message).toString());
      await this.sendMessage(bufferedMessage);
      this.logger.log(`Publisher - Message published: ${message.toString()} - ${Date.now()}`);
    } catch (e) {
      const error = new PublisherException(e, 'PublisherService - Error on send message', { message });
      this.logger.verror(error);
      throw error;
    }
  }

  private async sendMessage(message: Buffer): Promise<void> {
    await this.channel.publish(CURRICULUM_COMMAND_EXCHANGE, '', message);
  }

  private async setupChannel(): Promise<void> {
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(CURRICULUM_COMMAND_QUEUE, { autoDelete: false, durable: true });
    await this.channel.bindQueue(CURRICULUM_COMMAND_QUEUE, CURRICULUM_COMMAND_EXCHANGE, '');
  }
}
