import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TrendingMediaController from 'src/controllers/trending.media.controller';
import TrendingMedia from 'src/entities/trending.media.entity';
import TrendingMediaService from 'src/services/trending.media.service';
import ShowModule from './show.module';
import MovieModule from './movie.module';

@Module({
  imports: [TypeOrmModule.forFeature([TrendingMedia]), ShowModule, MovieModule],
  controllers: [TrendingMediaController],
  providers: [TrendingMediaService],
})
export default class TrendingMediaModule {}
