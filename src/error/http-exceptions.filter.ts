import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
  HttpAdapterHost,
  ExceptionFilter,
} from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { CODE_ERROR } from './errors';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: LoggerService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const error = exception.getResponse();

    const message = this.buildMessage(error['message'], error['code']);
    const metadata = error['metadata']
      ? { metadata: error['metadata'] }
      : undefined;

    this.logger.error(message, exception.stack, metadata);

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  buildMessage(message: string, code?: CODE_ERROR): string {
    if (code) {
      return `${code}: ${message}`;
    }
    return message;
  }
}
