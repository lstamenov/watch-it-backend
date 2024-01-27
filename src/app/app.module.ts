import { Module } from '@nestjs/common';

import DatabaseModule from '../db';
import UserModule from '../modules/user.module';
import AuthenticationModule from 'src/modules/authentication.module';
import MovieModule from 'src/modules/movie.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthenticationModule, MovieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
