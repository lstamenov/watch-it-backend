import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TrendingMediaController from 'src/controllers/trending.media.controller';
import TrendingMedia from 'src/entities/trending.media.entity';
import MovieService from 'src/services/movie.service';
import TrendingMediaService from 'src/services/trending.media.service';
import ShowModule from './show.module';

@Module({
  imports: [TypeOrmModule.forFeature([TrendingMedia]), ShowModule],
  controllers: [TrendingMediaController],
  providers: [MovieService, TrendingMediaService],
})
export default class TrendingMediaModule {}
