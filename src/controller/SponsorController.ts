import { ParameterException, Success } from '../utils/HttpException';
import { SponsorService } from '../service/SponsorService';
import { Request } from 'express-jwt';
import { NextFunction, Response } from 'express';

export class SponsorController {
  private sponsorService: SponsorService = new SponsorService();

  async getSponsors(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { currentPage, pageSize } = req.query;
    const sponsor = await this.sponsorService.getSponsors(
      currentPage,
      pageSize,
    );
    if (!sponsor) {
      next(new ParameterException('没有查询到数据'));
    }
    next(new Success(sponsor, '查询成功'));
  }

  async addSponsor(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { user_id, number } = req.body;
    const sponsor = await this.sponsorService.addSponsor({
      user: user_id,
      number,
    });
    if (!sponsor) {
      next(new ParameterException('添加失败'));
    }
    next(new Success(sponsor, '添加成功'));
  }
}
