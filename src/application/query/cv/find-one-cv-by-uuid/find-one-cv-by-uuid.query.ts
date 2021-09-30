import { QueryInterface } from '../../query.interface';

export class FindOneCvByUuidQuery implements QueryInterface {
  constructor(
    public readonly uuid: string,
    public readonly sources: string[],
  ) {}
}
