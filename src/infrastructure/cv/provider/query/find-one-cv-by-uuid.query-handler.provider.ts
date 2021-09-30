import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { CvQueryRepositoryInterface } from '../../../../domain/cv/repository/cv.query-repository.interface';
import { CvQueryRepository } from '../../repository/cv/cv.query-repository';
import { FindOneCvByUuidQueryHandler } from '../../../../application/query/cv/find-one-cv-by-uuid/find-one-cv-by-uuid.query-handler';

export const findOneCvByUuidQueryHandlerProvider: FactoryProvider = {
  provide: 'FIND_ONE_CV_BY_UUID_QUERY_HANDLER',
  useFactory: (repository: CvQueryRepositoryInterface, logger: LoggerInterface) => {
    return new FindOneCvByUuidQueryHandler(repository, logger);
  },
  inject: [CvQueryRepository, LoggerAdapterService],
}
