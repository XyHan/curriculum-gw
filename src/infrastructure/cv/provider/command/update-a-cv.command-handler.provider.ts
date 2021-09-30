import { FactoryProvider } from '@nestjs/common';
import { UpdateACvCommandHandler } from '../../../../application/command/cv/update-a-cv/update-a-cv.command-handler';
import { PublisherService } from '../../../amqp/publisher/publisher.service';
import { PublisherInterface } from '../../../../domain/amqp/publisher.interface';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { ConfigService } from '../../../config/config.service';
import { ConfigInterface } from '../../../config/config.interface';

export const updateACvCommandHandlerProvider: FactoryProvider = {
  provide: 'UPDATE_A_CV_COMMAND_HANDLER',
  useFactory: (publisher: PublisherInterface, logger: LoggerInterface, config: ConfigInterface) => {
    return new UpdateACvCommandHandler(publisher, logger, config);
  },
  inject: [PublisherService, LoggerAdapterService, ConfigService],
}
