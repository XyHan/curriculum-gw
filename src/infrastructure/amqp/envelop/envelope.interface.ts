import { Message } from '../../../domain/bus/message';

export interface EnvelopeInterface {
  messageType: string;
  serializedMessage: string;
  message: Message;
}
