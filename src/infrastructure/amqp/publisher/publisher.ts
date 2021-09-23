import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import { Channel } from 'amqplib';
import { ConfigService } from '../../config/config.service';
import { PublisherInterface } from './publisher.interface';
import { PublisherException } from './publisher.exception';
import { LoggerAdapterService } from '../../logger/logger-adapter.service';

const CURRICULUM_COMMAND_EXCHANGE = 'ex_curriculum_command';
const CURRICULUM_COMMAND_QUEUE = 'q_curriculum_gw_to_curriculum_api_command';

@Injectable()
export class Publisher implements PublisherInterface, OnModuleInit {
  private connection: any;
  private channel: Channel;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject(LoggerAdapterService) private readonly logger: LoggerAdapterService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.connect();
    await this.setupChannel();
  }

  public async publish(message: Buffer): Promise<void> {
    try {
      await this.sendMessage(message);
      this.logger.log(`Publisher - Message published: ${message.toString()} - ${Date.now()}`);
    } catch (e) {
      const error = new PublisherException(e, 'Publisher - Error on send message', { message });
      this.logger.verror(error);
      throw error;
    }
  }

  private async sendMessage(message: Buffer): Promise<void> {
    await this.channel.publish(CURRICULUM_COMMAND_EXCHANGE, '', message);
  }

  private async connect(): Promise<void> {
    this.connection = await amqp.connect(this.configService.configAmqp);
    this.connection.on('error', err => {
      throw new PublisherException(err, 'Publisher - failed to connect to rabbitmq');
    });
  }

  private async setupChannel(): Promise<void> {
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(CURRICULUM_COMMAND_QUEUE, { autoDelete: false, durable: true });
    await this.channel.bindQueue(CURRICULUM_COMMAND_QUEUE, CURRICULUM_COMMAND_EXCHANGE, '');
  }

  public async close(): Promise<void> {
    await this.channel.close();
    await this.connection.close();
  }
}
