import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Movie } from 'src/entities';
import RelatedMoviesService from 'src/services/related.movies.service';
import { Request, Response } from 'src/types/interfaces';

@Controller({ path: '/related/movies' })
class RelatedMoviesController {
  private relatedMoviesService: RelatedMoviesService;

  constructor(relatedMoviesService: RelatedMoviesService) {
    this.relatedMoviesService = relatedMoviesService;
  }

  @Get('/similar/:movieId')
  public async getSimilarMovies(@Req() req: Request, @Res() res: Response) {
    try {
      const movieId: number = Number(req.params.movieId);
      const language: string = req.query.language.toString();
      const similarMovies: Movie[] = await this.relatedMoviesService.getSimilarMovies(movieId, language);

      return res.status(HttpStatus.OK).send(similarMovies);
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).send(e);
    }
  }

  @Get('/recommended/:movieId')
  public async getRecommendedMovies(@Req() req: Request, @Res() res: Response) {
    try {
      const movieId: number = Number(req.params.movieId);
      const language: string = req.query.language.toString();
      const recommendedMovies: Movie[] = await this.relatedMoviesService.getRecommendedMovies(movieId, language);

      return res.status(HttpStatus.OK).send(recommendedMovies);
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).send(e);
    }
  }
}

export default RelatedMoviesController;
