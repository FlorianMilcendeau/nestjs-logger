import { Injectable } from '@nestjs/common';
import { logger } from './winston.config';

@Injectable()
export class LoggerService {
  private _context?: string;

  set context(ctx: string) {
    this._context = ctx;
  }

  log(message: string, meta?: any[]) {
    logger.info(message, { ...meta, context: this._context });
  }

  error(message: string, trace: string, meta?: any[]) {
    logger.error(message, { ...meta, context: this._context, trace });
  }

  warn(message: string, meta?: any[]) {
    logger.warn(message, { ...meta, context: this._context });
  }

  debug(message: string, meta?: any[]) {
    logger.debug(message, { ...meta, context: this._context });
  }
}
