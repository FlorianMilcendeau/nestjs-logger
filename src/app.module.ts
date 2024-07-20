import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/api'),
    LoggerModule,
    BookModule,
  ],
})
export class AppModule {}
