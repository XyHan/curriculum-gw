export interface PublisherInterface {
  publish(message: Buffer): Promise<void>;
  close(): Promise<void>
}
