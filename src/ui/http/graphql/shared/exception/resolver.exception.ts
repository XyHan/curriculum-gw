import { VError } from '@netflix/nerror';
import * as uniqid from 'uniqid';

type contextResolver = {
  headers: { id_request?: string };
  req: { body?: object };
};

export class ResolverException extends VError {
  constructor(message: string, context?: contextResolver | null, cause?: Error | null) {
    const id = uniqid();
    const keyRequestBody = `requestBody_${id}`;
    const keyIdRequest = `idRequest_${id}`;
    const info = {};
    info[keyRequestBody] = null;
    info[keyIdRequest] = null;

    const body = context?.req?.body;
    if (body !== undefined) {
      info[keyRequestBody] = JSON.stringify(body, null, 2);
    }
    const idRequest = context?.headers?.id_request;
    if (idRequest !== undefined) {
      info[keyIdRequest] = idRequest;
    }
    super(
      {
        name: 'ResolverException',
        cause,
        info,
      },
      message,
    );
  }
}
