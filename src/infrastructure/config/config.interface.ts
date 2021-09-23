export interface ConfigInterface {
  configAmqp: IConfigAmqp;
}

export interface IConfigAmqp {
  hostname: string;
  port: number;
  username: string;
  password: string;
  vhost: string;
}
