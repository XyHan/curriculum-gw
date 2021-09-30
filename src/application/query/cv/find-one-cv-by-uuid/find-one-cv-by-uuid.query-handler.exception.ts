import { VError } from '@netflix/nerror';

export class FindOneCvByUuidQueryHandlerException extends VError {
  constructor(options: VError.Options | Error, message: string, params: any[]) {
    super(options, message, params)
  }
}
