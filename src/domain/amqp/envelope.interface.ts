import { MessageInterface } from './message.interface';

export interface EnvelopeInterface {
  messageType: string;
  serializedMessage: string;
  message: MessageInterface;
}
