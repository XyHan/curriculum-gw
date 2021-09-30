export interface ConfigInterface {
  configAmqp: IConfigAmqp;
  amqpEvent: { queue: string; exchange: string };
  amqpCommand: { queue: string; exchange: string };
  esNode: string;
}

export interface IConfigAmqp {
  hostname: string;
  port: number;
  username: string;
  password: string;
  vhost: string;
}
