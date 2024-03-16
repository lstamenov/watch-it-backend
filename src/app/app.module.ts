import { Module } from '@nestjs/common';

import DatabaseModule from '../db';
import UserModule from '../modules/user.module';
import AuthenticationModule from 'src/modules/authentication.module';
import MovieModule from 'src/modules/movie.module';
import ShowModule from 'src/modules/show.module';
import TrendingMediaModule from 'src/modules/trending.media.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthenticationModule, MovieModule, ShowModule, TrendingMediaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
