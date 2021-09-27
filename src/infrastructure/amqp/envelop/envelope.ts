import { Expose, serialize } from 'class-transformer';
import { Message } from '../message/message';
import { EnvelopeInterface } from '../../../domain/amqp/envelope.interface';

export class Envelope implements EnvelopeInterface {
  @Expose({ name: 'serialized_message' })
  public serializedMessage: string;

  @Expose({ name: 'message_type' })
  public messageType: string;

  public message: Message;

  constructor(message: Message) {
    if (message) {
      this.wrap(message);
    }
  }

  private wrap(message: Message): void {
    this.messageType = message.name;
    this.serializedMessage = serialize(message);
    this.message = message;
  }
}
