import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import AuthenticationService from 'src/services/authentication.service';

@Module({
  providers: [AuthenticationService, JwtService],
  exports: [AuthenticationService],
})
class AuthenticationModule {}

export default AuthenticationModule;
