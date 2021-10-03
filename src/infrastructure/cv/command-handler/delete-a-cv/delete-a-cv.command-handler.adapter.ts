import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { CommandHandlerInterface } from '../../../../application/command/command-handler.interface';
import { DeleteACvCommand } from '../../../../application/command/cv/delete-a-cv/delete-a-cv.command';
import { CommandInterface } from '../../../../application/command/command.interface';

@CommandHandler(DeleteACvCommand)
export class DeleteACvCommandHandlerAdapter implements ICommandHandler {
  private readonly _commandHandler: CommandHandlerInterface;

  constructor(@Inject('DELETE_A_CV_COMMAND_HANDLER') commandHandler: CommandHandlerInterface) {
    this._commandHandler = commandHandler;
  }

  async execute(command: DeleteACvCommand): Promise<CommandInterface> {
    return await this._commandHandler.handle(command);
  }
}
