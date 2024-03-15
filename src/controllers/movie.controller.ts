import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Movie } from 'src/entities';
import MovieService from 'src/services/movie.service';
import { Request, Response } from 'src/types/interfaces';

@Controller({ path: '/movies' })
class MovieController {
  private movieService: MovieService;

  constructor(movieService: MovieService) {
    this.movieService = movieService;
  }

  @Get('/:id')
  public async getMovie(@Req() req: Request, @Res() res: Response) {
    try {
      const id: number = Number(req.params.id);
      const language: string = req.query.language.toString();
      const movie: Movie = await this.movieService.getMovieById(id, language);

      return res.status(HttpStatus.OK).send(movie);
    } catch (e) {
      console.log(e);
      return res.status(HttpStatus.NOT_FOUND).send(e?.message);
    }
  }
}

export default MovieController;
