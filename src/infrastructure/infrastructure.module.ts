import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { LoggerModule } from './logger/logger.module';
import { CvModule } from './cv/cv.module';
import { ConfigModule as AppConfigModule }  from './config/config.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AppConfigModule,
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    CqrsModule,
    LoggerModule,
    CvModule,
  ],
})
export class InfrastructureModule {}
