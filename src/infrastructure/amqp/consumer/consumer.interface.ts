import { Channel } from 'amqplib';

export interface ConsumerInterface {
  consume(channel: Channel, queue: string): Promise<void>
}
