import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateBookDto } from './dto/CreateBookDto.dto';
import { UpdateBookDto } from './dto/UpdateBookDto.dto';
import { LoggerService } from '../logger/logger.service';

import { Book } from './schemas/book.schema';
import { BookService } from './book.service';

import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('books')
export class BookController {
  constructor(
    private bookService: BookService,
    private readonly logger: LoggerService,
  ) {
    this.logger.context = BookController.name;
  }

  @Get()
  async getBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    this.logger.log('Fetching all books');
    return await this.bookService.findAll(query);
  }

  @Post('new')
  async createBook(
    @Body()
    createBook: CreateBookDto,
  ): Promise<Book> {
    this.logger.log('Creating a new book');
    return await this.bookService.createBook(createBook);
  }

  @Get(':id')
  async getBook(@Param('id') id: string): Promise<Book> {
    this.logger.log(`Fetching book with ID ${id}`);

    const book = await this.bookService.getBookById(id);

    return book;
  }

  @Put(':id')
  async updateBook(
    @Param('id')
    id: string,
    @Body()
    updateBook: UpdateBookDto,
  ): Promise<Book> {
    this.logger.log(`Updating Book with ID ${id}`);
    const updatedBook = await this.bookService.updateBookById(id, updateBook);

    return updatedBook;
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    this.logger.log(`Deleting Book with ID ${id}`);
    const deleteBook = await this.bookService.deleteBookById(id);

    return deleteBook;
  }
}
