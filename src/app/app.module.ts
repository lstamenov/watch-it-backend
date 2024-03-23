import { Module } from '@nestjs/common';

import DatabaseModule from '../db';
import UserModule from '../modules/user.module';
import AuthenticationModule from 'src/modules/authentication.module';
import MovieModule from 'src/modules/movie.module';
import ShowModule from 'src/modules/show.module';
import TrendingMediaModule from 'src/modules/trending.media.module';
import RelatedMoviesModule from 'src/modules/related.movies.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthenticationModule,
    MovieModule,
    ShowModule,
    TrendingMediaModule,
    RelatedMoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
