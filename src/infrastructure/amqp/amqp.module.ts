import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { ConfigModule } from '../config/config.module';
import { PublisherService } from './publisher/publisher.service';
import { ConsumerService } from './consumer/consumer.service';
import { ConnectionService } from './connect/connection.service';
import { CqrsModule } from '@nestjs/cqrs';
import { PubSubModule } from '../pub-sub/pub-sub.module';

@Module({
  imports: [
    CqrsModule,
    ConfigModule,
    LoggerModule,
    PubSubModule,
  ],
  providers: [
    ConnectionService,
    PublisherService,
    ConsumerService
  ],
  exports: [
    PublisherService,
    ConsumerService,
  ]
})
export class AmqpModule {}
