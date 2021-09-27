import { Module } from '@nestjs/common';
import { CvCommandHandler } from './command-handler';
import { createACvCommandHandlerProvider } from './provider/create-a-cv.command-handler.provider';
import { LoggerModule } from '../logger/logger.module';
import { AmqpModule } from '../amqp/amqp.module';

@Module({
  imports: [
    AmqpModule,
    LoggerModule
  ],
  providers: [
    createACvCommandHandlerProvider,
    ...CvCommandHandler,
  ],
})
export class CvModule {}
