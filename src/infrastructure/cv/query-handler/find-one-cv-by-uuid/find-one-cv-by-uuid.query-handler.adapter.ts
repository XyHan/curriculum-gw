import { IQueryHandler, QueryHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { FindOneCvByUuidQuery } from '../../../../application/query/cv/find-one-cv-by-uuid/find-one-cv-by-uuid.query';
import { CVInterface } from '../../../../domain/cv/model/cv/cv.model';
import { QueryHandlerInterface } from '../../../../application/query/query-handler.interface';

@QueryHandler(FindOneCvByUuidQuery)
export class FindOneCvByUuidQueryHandlerAdapter implements IQueryHandler {
  private readonly _queryHandler: QueryHandlerInterface;

  constructor(@Inject('FIND_ONE_CV_BY_UUID_QUERY_HANDLER') queryHandler: QueryHandlerInterface) {
    this._queryHandler = queryHandler;
  }

  async execute(query: FindOneCvByUuidQuery): Promise<CVInterface> {
    return await this._queryHandler.handle(query);
  }
}
