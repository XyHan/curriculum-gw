import { CommandInterface } from '../../command.interface';

export class CreateACvCommand implements CommandInterface {
  public readonly name: string = 'CreateACVCommand';
  public readonly version: number = 1;
  
  constructor(
    public readonly requestId: string,
    public readonly userUuid: string,
  ) {}
}
