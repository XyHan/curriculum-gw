import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { ConfigModule } from '../config/config.module';
import { PublisherService } from './publisher/publisher.service';
import { ConsumerService } from './consumer/consumer.service';
import { ConnectionService } from './connect/connection.service';

@Module({
  imports: [
    ConfigModule,
    LoggerModule
  ],
  providers: [
    ConnectionService,
    PublisherService,
    ConsumerService
  ]
})
export class AmqpModule {}
