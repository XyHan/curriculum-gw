import { CommandHandlerInterface } from '../../command-handler.interface';
import { PublisherInterface } from '../../../../domain/amqp/publisher.interface';
import { DeleteACvCommandHandlerException } from './delete-a-cv.command-handler.exception';
import { DeleteACvCommand } from './delete-a-cv.command';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { CommandInterface } from '../../command.interface';
import { ConfigInterface } from '../../../../infrastructure/config/config.interface';

export class DeleteACvCommandHandler implements CommandHandlerInterface {
  constructor(
    protected readonly publisher: PublisherInterface,
    protected readonly logger: LoggerInterface,
    protected readonly config: ConfigInterface,
  ) {}

  public async handle(command: DeleteACvCommand): Promise<CommandInterface> {
    try {
      await this.publisher.publish(command);
      this.logger.info(`DeleteACvCommandHandler - handler - command ${command.requestId} handled`);
      return command;
    } catch (e) {
      const message = `DeleteACvCommandHandler - handler - error during handling command ${command.requestId}`;
      this.logger.error(message);
      throw new DeleteACvCommandHandlerException(e, message, [command]);
    }
  }

}
