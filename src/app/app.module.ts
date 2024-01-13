import { Module } from '@nestjs/common';

import DatabaseModule from '../db';
import UserModule from '../modules/user.module';
import AuthenticationModule from 'src/modules/authentication.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
