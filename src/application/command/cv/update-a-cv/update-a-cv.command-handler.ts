import { CommandHandlerInterface } from '../../command-handler.interface';
import { PublisherInterface } from '../../../../domain/amqp/publisher.interface';
import { UpdateACvCommandHandlerException } from './update-a-cv.command-handler.exception';
import { UpdateACvCommand } from './update-a-cv.command';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { CommandInterface } from '../../command.interface';
import { ConfigInterface } from '../../../../infrastructure/config/config.interface';

export class UpdateACvCommandHandler implements CommandHandlerInterface {
  constructor(
    protected readonly publisher: PublisherInterface,
    protected readonly logger: LoggerInterface,
    protected readonly config: ConfigInterface,
  ) {}

  public async handle(command: UpdateACvCommand): Promise<CommandInterface> {
    try {
      await this.publisher.publish(command);
      this.logger.info(`UpdateACvCommandHandler - handler - command ${command.requestId} handled`);
      return command;
    } catch (e) {
      const message = `UpdateACvCommandHandler - handler - error during handling command ${command.requestId}`;
      this.logger.error(message);
      throw new UpdateACvCommandHandlerException(e, message, [command]);
    }
  }

}
