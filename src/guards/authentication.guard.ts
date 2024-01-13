import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
class AuthenticationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const payload = request.user;

    return Boolean(payload?.userId);
  }
}

export default AuthenticationGuard;
