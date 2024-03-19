import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import MovieController from 'src/controllers/movie.controller';
import { Movie } from 'src/entities';
import MovieRepository from 'src/repositories/movie.repository';
import MovieService from 'src/services/movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MovieController],
  providers: [MovieService, MovieRepository],
  exports: [MovieService],
})
class MovieModule {}

export default MovieModule;
