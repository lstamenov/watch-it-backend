import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, Next } from 'src/types/interfaces';
import AuthenticationService from 'src/services/authentication.service';

@Injectable()
class AuthenticationMiddleware implements NestMiddleware {
  private authenticationService: AuthenticationService;

  constructor(authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;
  }

  use(request: Request, response: Response, next: Next) {
    try {
      const payload = this.authenticationService.verifyToken(request.headers);
      request.user = payload;
    } catch (e) {
      return response.status(HttpStatus.FORBIDDEN).send({ message: e.message as Error });
    }

    return next();
  }
}

export default AuthenticationMiddleware;
