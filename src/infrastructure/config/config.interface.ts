export interface ConfigInterface {
  configAmqp: IConfigAmqp;
  amqpEvent: { queue: string; exchange: string };
  amqpCommand: { queue: string; exchange: string };
  esNode: string;
  esIndexes: Map<string, string>;
}

export interface IConfigAmqp {
  hostname: string;
  port: number;
  username: string;
  password: string;
  vhost: string;
}
