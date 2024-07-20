import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './logger/logger.service';
import { HttpExceptionFilter } from './error/http-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapter = app.get(HttpAdapterHost);
  const logger = app.get(LoggerService);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter, logger));

  await app.listen(3000);
}
bootstrap();
