import { HttpStatus } from '@nestjs/common';

export const errors = {
  /**
   * Book
   */
  API_0001: { status: HttpStatus.NOT_FOUND, message: 'Book not found' },
  API_0002: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Please enter correct id.',
  },
};

export type CODE_ERROR = keyof typeof errors;
