import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from './schemas/book.schema';

import { Query } from 'express-serve-static-core';
import { ApiException } from 'src/error/http-exceptions';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const book = await this.bookModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return book;
  }

  async createBook(book: Book): Promise<Book> {
    const data = Object.assign(book);

    const res = await this.bookModel.create(data);
    return res;
  }

  async getBookById(id: string): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new ApiException('API_0002');
    }

    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new ApiException('API_0001');
    }

    return book;
  }

  async updateBookById(id: string, book: Book): Promise<Book> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      throw new ApiException('API_0001');
    }

    return updatedBook;
  }

  async deleteBookById(id: string): Promise<Book> {
    const deleteBook = await this.bookModel.findByIdAndDelete(id);

    if (!deleteBook) {
      throw new ApiException('API_0001');
    }

    return deleteBook;
  }
}
