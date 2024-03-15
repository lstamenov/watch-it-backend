import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IncomingHttpHeaders } from 'http';

@Injectable()
class AuthenticationService {
  private jwtService: JwtService;
  private secret: string;
  private expirationTime: string;

  constructor(jwtService: JwtService) {
    this.jwtService = jwtService;
    this.secret = 'secret';
    this.expirationTime = '24h';
  }

  private getTokenFromHeader(headers: IncomingHttpHeaders): string | null {
    const header: string = headers['authorization'] as string;

    if (!header) {
      return null;
    }

    const token = header.replace('Bearer ', '');
    return token;
  }

  public generateToken(userId: number) {
    return this.jwtService.sign({ userId }, { secret: this.secret, expiresIn: this.expirationTime });
  }

  public verifyToken(headers: IncomingHttpHeaders): { userId: number } {
    const token = this.getTokenFromHeader(headers);
    return this.jwtService.verify(token, { secret: this.secret });
  }
}

export default AuthenticationService;
