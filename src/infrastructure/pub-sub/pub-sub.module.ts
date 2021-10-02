import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { PubSubAdapter } from './pub-sub.adapter';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [ConfigModule, LoggerModule],
  providers: [PubSubAdapter],
  exports: [PubSubAdapter],
})
export class PubSubModule {}
