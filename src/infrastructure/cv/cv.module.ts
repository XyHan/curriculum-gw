import { Module } from '@nestjs/common';
import { CvCommandHandler } from './command-handler';
import { createACvCommandHandlerProvider } from './provider/create-a-cv.command-handler.provider';
import { updateACvCommandHandlerProvider } from './provider/update-a-cv.command-handler.provider';
import { LoggerModule } from '../logger/logger.module';
import { AmqpModule } from '../amqp/amqp.module';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    ConfigModule,
    AmqpModule,
    LoggerModule
  ],
  providers: [
    createACvCommandHandlerProvider,
    updateACvCommandHandlerProvider,
    ...CvCommandHandler,
  ],
})
export class CvModule {}
