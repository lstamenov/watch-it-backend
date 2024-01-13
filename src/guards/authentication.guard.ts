import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import AuthenticationService from 'src/services/authentication.service';

@Injectable()
class AuthenticationGuard implements CanActivate {
  private authenticationService: AuthenticationService;

  constructor(authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;
  }

  private getTokenFromHeader(headers: Record<string, string>): string | null {
    const header: string = headers['Authorization'];

    if (!header) {
      return null;
    }

    const token = header.split('Bearer ')[1];
    return token;
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    const token = this.getTokenFromHeader(headers);

    if (!token) {
      return false;
    }

    return Boolean(this.authenticationService.verifyToken(token));
  }
}

export default AuthenticationGuard;
