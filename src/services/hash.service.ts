import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
class HashService {
  private salt: number;

  constructor() {
    this.salt = 10;
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.salt);
  }

  comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

export default HashService;
