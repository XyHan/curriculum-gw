import { CommandHandlerInterface } from '../../command-handler.interface';
import { PublisherInterface } from '../../../../domain/amqp/publisher.interface';
import { CreateACvCommandHandlerException } from './create-a-cv.command-handler.exception';
import { CreateACvCommand } from './create-a-cv.command';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { CommandInterface } from '../../command.interface';
import { ConfigInterface } from '../../../../infrastructure/config/config.interface';

export class CreateACvCommandHandler implements CommandHandlerInterface {
  constructor(
    protected readonly publisher: PublisherInterface,
    protected readonly logger: LoggerInterface,
    protected readonly config: ConfigInterface,
  ) {}

  public async handle(command: CreateACvCommand): Promise<CommandInterface> {
    try {
      await this.publisher.publish(command);
      this.logger.info(`CreateACvCommandHandler - handler - command ${command.requestId} handled`);
      return command;
    } catch (e) {
      const message = `CreateACvCommandHandler - handler - error during handling command ${command.requestId}`;
      this.logger.error(message);
      throw new CreateACvCommandHandlerException(e, message, [command]);
    }
  }

}
