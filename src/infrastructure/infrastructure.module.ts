import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { LoggerModule } from './logger/logger.module';
import { CvModule } from './cv/cv.module';
import { ConfigModule as AppConfigModule }  from './config/config.module';
import { ConfigModule } from '@nestjs/config';
import { SearchModule } from './elasticsearch/search.module';

@Module({
  imports: [
    AppConfigModule,
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    CqrsModule,
    LoggerModule,
    CvModule,
    SearchModule
  ],
})
export class InfrastructureModule {}
