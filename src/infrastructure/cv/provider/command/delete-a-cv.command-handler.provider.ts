import { FactoryProvider } from '@nestjs/common';
import { PublisherService } from '../../../amqp/publisher/publisher.service';
import { PublisherInterface } from '../../../../domain/amqp/publisher.interface';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { ConfigService } from '../../../config/config.service';
import { ConfigInterface } from '../../../config/config.interface';
import { DeleteACvCommandHandler } from '../../../../application/command/cv/delete-a-cv/delete-a-cv.command-handler';

export const deleteACvCommandHandlerProvider: FactoryProvider = {
  provide: 'DELETE_A_CV_COMMAND_HANDLER',
  useFactory: (publisher: PublisherInterface, logger: LoggerInterface, config: ConfigInterface) => {
    return new DeleteACvCommandHandler(publisher, logger, config);
  },
  inject: [PublisherService, LoggerAdapterService, ConfigService],
}
