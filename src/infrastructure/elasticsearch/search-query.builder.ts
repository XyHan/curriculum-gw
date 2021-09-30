import { Injectable } from '@nestjs/common';

export type SearchQuery = {
  index: string;
  size: number;
  from: number;
  body: {
    sort: sortFilter[],
    query: {
      bool: {
        must: object[],
        should: object[],
      },
    },
  };
  _source: string[];
}
export type sortFilter = { createdAt: { order: 'asc' | 'desc' }} | { updatedAt: { order: 'asc' | 'desc' }};

export class SearchQueryBuilder {
  private readonly _query: SearchQuery;

  constructor(index: string, size: number = 10, from: number = 0) {
    this._query = {
      index,
      size,
      from,
      body: {
        sort: [],
        query: {
          bool: {
            must: [],
            should: [],
          },
        },
      },
      _source: [],
    }
  }

  public addSortFilter(filter: sortFilter): SearchQuery {
    this._query.body.sort.push(filter);
    return this._query;
  }

  public addMustFilter(filter: object): SearchQuery {
    this._query.body.query.bool.must.push(filter);
    return this._query;
  }

  public addShouldFilter(filter: object): SearchQuery {
    this._query.body.query.bool.should.push(filter);
    return this._query;
  }

  public addSources(sources: string[]): SearchQuery {
    this._query._source = sources;
    return this._query;
  }

  get query(): SearchQuery {
    return this._query;
  }
}
