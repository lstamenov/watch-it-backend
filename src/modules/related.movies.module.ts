import { Module } from '@nestjs/common';
import MovieModule from './movie.module';
import RelatedMoviesController from 'src/controllers/related.movies.controller';
import RelatedMoviesService from 'src/services/related.movies.service';

@Module({
  imports: [MovieModule],
  controllers: [RelatedMoviesController],
  providers: [RelatedMoviesService],
})
export default class RelatedMoviesModule {}
