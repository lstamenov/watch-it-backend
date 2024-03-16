import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TrendingMedia from 'src/entities/trending.media.entity';
import MovieService from 'src/services/movie.service';
import ShowService from 'src/services/show.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrendingMedia])],
  controllers: [],
  providers: [MovieService, ShowService],
})
export default class TrendingMediaModule {}
