import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import { ConfigService } from '../../config/config.service';
import { LoggerAdapterService } from '../../logger/logger-adapter.service';
import { ConnectionInterface } from './connection.interface';
import { ConnectionException } from './connection.exception';
import { LoggerVErrorInterface } from '../../logger/logger-v-error.interface';

@Injectable()
export class ConnectionService implements ConnectionInterface, OnModuleInit {
  protected connection: amqp.Connection;

  constructor(
    @Inject(ConfigService) protected readonly configService: ConfigService,
    @Inject(LoggerAdapterService) protected readonly logger: LoggerVErrorInterface,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.connect();
  }

  public async connect(): Promise<void> {
    this.connection = await amqp.connect(this.configService.configAmqp);
    this.connection.on('error', err => {
      throw new ConnectionException(err, 'ConnectionService - failed to connect to rabbitmq');
    });

    this.connection.on("close", async () => {
      this.logger.verror(new ConnectionException(new Error('amqp connection close'), 'ConnectionService - connection to rabbitmq has been closed'));
      setTimeout(async () => await this.onModuleInit(), 1000);
    });
  }

  public async close(): Promise<void> {
    await this.connection.close();
  }
}
