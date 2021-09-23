import { Injectable } from '@nestjs/common';
import { ConfigInterface, IConfigAmqp } from './config.interface';

@Injectable()
export class ConfigService implements ConfigInterface {
  public readonly configAmqp: IConfigAmqp;

  constructor() {
    this.configAmqp = {
      hostname: process.env.AMQP_HOST,
      port: Number(process.env.AMQP_PORT),
      username: process.env.AMQP_USERNAME,
      password: process.env.AMQP_PASSWORD,
      vhost: process.env.AMQP_VHOST,
    };
  }
}
