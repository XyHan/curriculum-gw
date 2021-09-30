import { Injectable } from '@nestjs/common';
import { ConfigInterface, IConfigAmqp } from './config.interface';

@Injectable()
export class ConfigService implements ConfigInterface {
  public readonly configAmqp: IConfigAmqp;
  public readonly amqpEvent: { queue: string; exchange: string };
  public readonly amqpCommand: { queue: string; exchange: string };
  public readonly esNode: string;

  constructor() {
    this.configAmqp = {
      hostname: process.env.AMQP_HOST,
      port: Number(process.env.AMQP_PORT),
      username: process.env.AMQP_USERNAME,
      password: process.env.AMQP_PASSWORD,
      vhost: process.env.AMQP_VHOST,
    };

    this.amqpEvent = {
      queue: process.env.AMQP_EVENT_QUEUE,
      exchange: process.env.AMQP_EVENT_EX
    };

    this.amqpCommand = {
      queue: process.env.AMQP_COMMAND_QUEUE,
      exchange: process.env.AMQP_COMMAND_EX
    };

    this.esNode = process.env.ES_NODE;
  }
}
