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

class UserNotFoundError extends AppError {
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}

class ShowNotFoundError extends AppError {
  constructor() {
    super('Show not found', HttpStatus.NOT_FOUND);
  }
}

export { CredentialsInUseError, InvalidCredentialsError, UserNotFoundError, ShowNotFoundError };
