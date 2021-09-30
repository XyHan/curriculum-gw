export type GetQuery = {
  index: string;
  id: string;
  _source: string[];
}

export class GetQueryBuilder {
  private readonly _query: GetQuery;

  constructor(index: string, id: string) {
    this._query = {
      index,
      id,
      _source: [],
    }
  }

  public addSources(sources: string[]): GetQueryBuilder {
    this._query._source = sources;
    return this;
  }

  get query(): GetQuery {
    return this._query;
  }
}
