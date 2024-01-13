import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
class AuthenticationService {
  private jwtService: JwtService;

  constructor(jwtService: JwtService) {
    this.jwtService = jwtService;
  }

  public generateToken(userId: number) {
    return this.jwtService.sign({ userId });
  }

  public verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}

export default AuthenticationService;
