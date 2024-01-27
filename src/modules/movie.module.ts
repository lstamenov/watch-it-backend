import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import MovieController from 'src/controllers/movie.controller';
import { Movie } from 'src/entities';
import MovieService from 'src/services/movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MovieController],
  providers: [MovieService],
})
class MovieModule {}

export default MovieModule;
