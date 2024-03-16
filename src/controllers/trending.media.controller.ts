import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Movie, Show } from 'src/entities';
import TrendingMediaService from 'src/services/trending.media.service';
import { Request, Response } from 'src/types/interfaces';

@Controller({ path: '/trending' })
class TrendingMediaController {
  private trendingMediaService: TrendingMediaService;

  constructor(trendingMediaService: TrendingMediaService) {
    this.trendingMediaService = trendingMediaService;
  }

  @Get('/all')
  public async getAllTrendingMedia(@Req() req: Request, @Res() res: Response) {
    try {
      const page: number = Number(req.query.page);
      const language: string = req.query.language.toString();
      const trendingMedia: (Movie | Show)[] = await this.trendingMediaService.getTrendingMedia(language, page);

      return res.status(HttpStatus.OK).send(trendingMedia);
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).send(e);
    }
  }
}

export default TrendingMediaController;
