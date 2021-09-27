import { FactoryProvider } from '@nestjs/common';
import { CreateACvCommandHandler } from '../../../application/command/cv/create-a-cv/create-a-cv.command-handler';
import { PublisherService } from '../../amqp/publisher/publisher.service';
import { PublisherInterface } from '../../../domain/amqp/publisher.interface';
import { LoggerInterface } from '../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../logger/logger-adapter.service';

export const createACvCommandHandlerProvider: FactoryProvider = {
  provide: 'CREATE_A_CV_COMMAND_HANDLER',
  useFactory: (publisher: PublisherInterface, logger: LoggerInterface) => {
    return new CreateACvCommandHandler(publisher, logger);
  },
  inject: [PublisherService, LoggerAdapterService],
}
