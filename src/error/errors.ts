import { HttpStatus } from '@nestjs/common';

export const errors = {
  /**
   * Book
   */
  API_0001: { status: HttpStatus.NOT_FOUND, message: 'Book not found' },
};

export type CODE_ERROR = keyof typeof errors;
