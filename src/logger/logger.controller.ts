import { Controller, Get } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Controller('logger')
export class LoggerController {
  constructor(private readonly logger: LoggerService) {
    logger.context = LoggerController.name;
  }

  @Get('info')
  getInfoLog() {
    this.logger.log('This is an INFO log message from the LoggerController.');
    return 'Logged an INFO message.';
  }

  @Get('error')
  getErrorLog() {
    this.logger.error(
      'This is an ERROR log message from the LoggerController.',
      null,
    );
    return 'Logged an ERROR message.';
  }
}
