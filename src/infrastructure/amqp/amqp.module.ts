import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { ConfigModule } from '../config/config.module';
import { Publisher } from './publisher/publisher';

@Module({
  imports: [
    ConfigModule,
    LoggerModule
  ],
  providers: [Publisher]
})
export class AmqpModule {}
