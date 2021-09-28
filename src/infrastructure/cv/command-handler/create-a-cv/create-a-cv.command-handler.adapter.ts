import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { CommandHandlerInterface } from '../../../../application/command/command-handler.interface';
import { CreateACvCommand } from '../../../../application/command/cv/create-a-cv/create-a-cv.command';
import { CommandInterface } from '../../../../application/command/command.interface';

@CommandHandler(CreateACvCommand)
export class CreateACvCommandHandlerAdapter implements ICommandHandler {
  private readonly _commandHandler: CommandHandlerInterface;

  constructor(@Inject('CREATE_A_CV_COMMAND_HANDLER') commandHandler: CommandHandlerInterface) {
    this._commandHandler = commandHandler;
  }

  async execute(command: CreateACvCommand): Promise<CommandInterface> {
    return await this._commandHandler.handle(command);
  }
}
