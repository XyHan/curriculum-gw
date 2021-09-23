import { MessageInterface } from '../../../domain/bus/message';

export interface PublisherInterface {
  publish(message: MessageInterface): Promise<void>;
  close(): Promise<void>
}
