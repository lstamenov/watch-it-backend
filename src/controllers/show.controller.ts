import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Show } from 'src/entities';
import ShowService from 'src/services/show.service';
import { Request, Response } from 'src/types/interfaces';

@Controller({ path: '/shows' })
class ShowController {
  private showService: ShowService;

  constructor(showService: ShowService) {
    this.showService = showService;
  }

  @Get('/:id')
  public async getShow(@Req() req: Request, @Res() res: Response) {
    try {
      const id: number = Number(req.params.id);
      const language: string = req.query.language.toString();
      const show: Show = await this.showService.getShowById(id, language);

      return res.status(HttpStatus.OK).send(show);
    } catch (e) {
      return res.status(HttpStatus.NOT_FOUND).send(e?.message);
    }
  }
}

export default ShowController;
