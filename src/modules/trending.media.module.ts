import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TrendingMedia from 'src/entities/trending.media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrendingMedia])],
  controllers: [],
  providers: [],
})
export default class TrendingMediaModule {}
