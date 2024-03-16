import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TrendingMediaController from 'src/controllers/trending.media.controller';
import TrendingMedia from 'src/entities/trending.media.entity';
import MovieService from 'src/services/movie.service';
import ShowService from 'src/services/show.service';
import TrendingMediaService from 'src/services/trending.media.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrendingMedia])],
  controllers: [TrendingMediaController],
  providers: [MovieService, ShowService, TrendingMediaService],
})
export default class TrendingMediaModule {}
