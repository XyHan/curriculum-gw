import { MessageInterface } from '../../../domain/amqp/message.interface';

export class Message implements MessageInterface {
  private readonly _requestId: string;
  private readonly _userUuid: string;
  private readonly _version: number;
  private readonly _name: string;

  constructor(
    requestId: string,
    userUuid: string,
    version = 1,
    name = 'app-message',
  ) {
    this._requestId = requestId;
    this._userUuid = userUuid;
    this._version = version;
    this._name = name;
  }

  get requestId(): string {
    return this._requestId;
  }

  get userUuid(): string {
    return this._userUuid;
  }

  get version(): number {
    return this._version;
  }

  get name(): string {
    return this._name;
  }
}
