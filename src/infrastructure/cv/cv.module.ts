import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { AmqpModule } from '../amqp/amqp.module';
import { ConfigModule } from '../config/config.module';
import { SearchModule } from '../elasticsearch/search.module';
import { CvQueryRepository } from './repository/cv/cv.query-repository';
import { CvCommandHandler } from './command-handler';
import { createACvCommandHandlerProvider } from './provider/command/create-a-cv.command-handler.provider';
import { updateACvCommandHandlerProvider } from './provider/command/update-a-cv.command-handler.provider';
import { deleteACvCommandHandlerProvider } from './provider/command/delete-a-cv.command-handler.provider';
import { findOneCvByUuidQueryHandlerProvider } from './provider/query/find-one-cv-by-uuid.query-handler.provider';
import { CvQueryHandler } from './query-handler';
import { cvEsIndexProvider } from './provider/index/cv-es-index.provider';

@Module({
  imports: [
    ConfigModule,
    AmqpModule,
    LoggerModule,
    SearchModule,
  ],
  providers: [
    cvEsIndexProvider,
    CvQueryRepository,
    createACvCommandHandlerProvider,
    updateACvCommandHandlerProvider,
    deleteACvCommandHandlerProvider,
    ...CvCommandHandler,
    findOneCvByUuidQueryHandlerProvider,
    ...CvQueryHandler,
  ],
})
export class CvModule {}
