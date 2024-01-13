import { HttpStatus } from '@nestjs/common';
import AppError from './app.error';

class CredentialsInUseError extends AppError {
  constructor() {
    super('Credentials already in use', HttpStatus.BAD_REQUEST);
  }
}

class InvalidCredentialsError extends AppError {
  constructor() {
    super('Invalid credentials', HttpStatus.BAD_REQUEST);
  }
}

export { CredentialsInUseError, InvalidCredentialsError };
