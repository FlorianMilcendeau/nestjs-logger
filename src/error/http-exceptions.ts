import { HttpException } from '@nestjs/common';
import { CODE_ERROR, errors } from './errors';

export class ApiException extends HttpException {
  constructor(code: CODE_ERROR, message?: string, meta?: any[]) {
    const error = errors[code];
    super({ ...error, code, metadata: meta }, error.status);
  }
}
