import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { AmqpModule } from '../amqp/amqp.module';
import { ConfigModule } from '../config/config.module';
import { SearchModule } from '../elasticsearch/search.module';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { CvQueryRepository } from './repository/cv/cv.query-repository';
import { CvCommandHandler } from './command-handler';
import { createACvCommandHandlerProvider } from './provider/command/create-a-cv.command-handler.provider';
import { updateACvCommandHandlerProvider } from './provider/command/update-a-cv.command-handler.provider';
import { findOneCvByUuidQueryHandlerProvider } from './provider/query/find-one-cv-by-uuid.query-handler.provider';
import { CvQueryHandler } from './query-handler';

@Module({
  imports: [
    ConfigModule,
    AmqpModule,
    LoggerModule,
    SearchModule,
  ],
  providers: [
    CvQueryRepository,
    createACvCommandHandlerProvider,
    updateACvCommandHandlerProvider,
    ...CvCommandHandler,
    findOneCvByUuidQueryHandlerProvider,
    ...CvQueryHandler,
  ],
})
export class CvModule {}
