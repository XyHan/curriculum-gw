import { CommandInterface } from '../../command.interface';

export class CreateACvCommand implements CommandInterface {
  public readonly name: string = 'CreateACVCommand';
  public readonly version: number = 1;
  
  constructor(
    public readonly requestId: string,
    public readonly userUuid: string,
    public readonly uuid: string,
    public readonly lastname: string,
    public readonly forname: string,
    public readonly city: string,
    public readonly zipCode: number,
    public readonly email: string,
    public readonly birthday: string,
    public readonly nationality: string,
    public readonly githubLink: string,
    public readonly title: string
  ) {}
}
