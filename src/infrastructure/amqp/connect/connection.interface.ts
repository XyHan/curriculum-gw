export interface ConnectionInterface {
  connect(): Promise<void>
  close(): Promise<void>
}
