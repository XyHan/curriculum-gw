import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { CommandHandlerInterface } from '../../../../application/command/command-handler.interface';
import { UpdateACvCommand } from '../../../../application/command/cv/update-a-cv/update-a-cv.command';
import { CommandInterface } from '../../../../application/command/command.interface';

@CommandHandler(UpdateACvCommand)
export class UpdateACvCommandHandlerAdapter implements ICommandHandler {
  private readonly _commandHandler: CommandHandlerInterface;

  constructor(@Inject('UPDATE_A_CV_COMMAND_HANDLER') commandHandler: CommandHandlerInterface) {
    this._commandHandler = commandHandler;
  }

  async execute(command: UpdateACvCommand): Promise<CommandInterface> {
    return await this._commandHandler.handle(command);
  }
}
