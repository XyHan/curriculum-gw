import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    CqrsModule,
    LoggerModule
  ],
})
export class InfrastructureModule {}
