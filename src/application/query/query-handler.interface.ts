import { QueryInterface } from './query.interface';

export interface QueryHandlerInterface {
  handle<T>(query: QueryInterface): Promise<any>;
}
