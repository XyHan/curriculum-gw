import { MessageInterface } from './message.interface';

export interface PublisherInterface {
  publish(message: MessageInterface): Promise<void>;
  close(): Promise<void>
}
