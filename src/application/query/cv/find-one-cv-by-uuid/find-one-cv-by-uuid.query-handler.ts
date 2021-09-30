import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { CvQueryRepositoryInterface } from '../../../../domain/cv/repository/cv.query-repository.interface';
import { FindOneCvByUuidQueryHandlerException } from './find-one-cv-by-uuid.query-handler.exception';
import { FindOneCvByUuidQuery } from './find-one-cv-by-uuid.query';
import { CVInterface } from '../../../../domain/cv/model/cv/cv.model';
import { QueryHandlerInterface } from '../../query-handler.interface';

export class FindOneCvByUuidQueryHandler implements QueryHandlerInterface {
  constructor(
    protected readonly repository: CvQueryRepositoryInterface,
    protected readonly logger: LoggerInterface
  ) {}

  public async handle(query: FindOneCvByUuidQuery): Promise<CVInterface | null> {
    try {
      return await this.repository.findOne({ uuid: query.uuid, sources: query.sources });
    } catch (e) {
      const message = `FindOneCvByUuidQueryHandler - handler - error during handling query with uuid ${query.uuid}`;
      this.logger.error(message);
      throw new FindOneCvByUuidQueryHandlerException(e, message, [query]);
    }
  }
}
