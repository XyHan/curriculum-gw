import { Inject, Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { LoggerAdapterService} from '../logger/logger-adapter.service';
import { LoggerInterface } from '../../domain/utils/logger/logger.interface';
import { PubSubException } from './pub-sub.exception';

export interface PubSubInterface {
  publish(triggerName: string, payload: any): Promise<void>;
  subscribe(triggerName: string, onMessage: (...args: any[]) => void): Promise<number>;
  unsubscribe(subId: number): void;
  asyncIterator<T>(triggers: string | string[]): AsyncIterator<T>;
}

@Injectable()
export class PubSubAdapter implements PubSubInterface {
  private readonly _pubSub: PubSub;

  constructor(
    @Inject(LoggerAdapterService) private readonly logger: LoggerInterface
  ) {
    this._pubSub = new PubSub();
  }

  public async publish(triggerName: string, payload: any): Promise<void> {
    try {
      return await this._pubSub.publish(triggerName, payload);
    } catch (e) {
      const message = `PubSubAdapter - publish - error: ${e.message}`;
      this.logger.error(message);
      throw new PubSubException(message);
    }
  }

  public async subscribe(triggerName: string, onMessage: (...args: any[]) => void): Promise<number> {
    try {
      return await this._pubSub.subscribe(triggerName, onMessage);
    } catch (e) {
      const message = `PubSubAdapter - subscribe - error: ${e.message}`;
      this.logger.error(message);
      throw new PubSubException(message);
    }
  }

  public unsubscribe(subId: number): void {
    try {
      return this._pubSub.unsubscribe(subId);
    } catch (e) {
      const message = `PubSubAdapter - unsubscribe - error: ${e.message}`;
      this.logger.error(message);
      throw new PubSubException(message);
    }
  }

  public asyncIterator<T>(triggers: string | string[]): AsyncIterator<T> {
    try {
      return this._pubSub.asyncIterator(triggers);
    } catch (e) {
      const message = `PubSubAdapter - asyncIterator - error: ${e.message}`;
      this.logger.error(message);
      throw new PubSubException(message);
    }
  }
}
