import { CommandInterface } from '../../command.interface';

export class DeleteACvCommand implements CommandInterface {
  public readonly name: string = 'DeleteACVCommand';
  public readonly version: number = 1;
  
  constructor(
    public readonly requestId: string,
    public readonly userUuid: string,
    public readonly uuid: string,
  ) {}
}
