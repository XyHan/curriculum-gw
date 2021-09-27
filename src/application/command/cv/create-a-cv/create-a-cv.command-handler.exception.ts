import { VError } from '@netflix/nerror';

export class CreateACvCommandHandlerException extends VError {
  constructor(options: VError.Options | Error, message: string, params: any[]) {
    super(options, message, params)
  }
}
