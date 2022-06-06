import {
  ParameterException,
  ServerError,
  Success,
} from '../utils/HttpException';
import { SponsorService } from '../service/SponsorService';
import { UserService } from '../service/UserService';
import { Request } from 'express-jwt';
import { NextFunction, Response } from 'express';

export class SponsorController {
  private sponsorService: SponsorService = new SponsorService();
  private userService: UserService = new UserService();

  async getSponsors(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const page =
      typeof req.query.page === 'string' ? parseInt(req.query.page) : 1;
    const pageSize =
      typeof req.query.pageSize === 'string'
        ? parseInt(req.query.pageSize)
        : 10;
    const sponsorRecords = await this.sponsorService.getSponsors(
      page,
      pageSize,
    );
    if (!sponsorRecords) {
      next(new ParameterException('没有查询到数据'));
    }
    next(new Success(sponsorRecords, '查询成功'));
  }

  async createSponsor(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { user_id, number } = req.body;
      const sponsor = await this.sponsorService.createSponsor({
        user: await this.userService.getUserById(parseInt(user_id)),
        number,
      });
      if (!sponsor) {
        next(new ParameterException('添加失败'));
      }
      next(new Success(sponsor, '添加成功'));
    } catch (e) {
      console.log(e);
      next(new ServerError());
    }
  }

  async updateSponsor(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { id, number, userId } = req.body;
    const sponsor = await this.sponsorService.updateSponsor({
      id,
      number,
      user: userId,
    });
    if (!sponsor) {
      next(new ServerError('更新失败'));
    }
    next(new Success(sponsor, '更新成功'));
  }

  async deleteSponsor(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const id = parseInt(req.params['id']);
    const sponsor = await this.sponsorService.deleteSponsorById(id);
    if (!sponsor) {
      next(new ServerError('删除失败'));
    }
    next(new Success(sponsor, '删除成功'));
  }

  async getSponsorList(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const page =
      typeof req.query.page === 'string' ? parseInt(req.query.page) : 1;
    const pageSize =
      typeof req.query.pageSize === 'string'
        ? parseInt(req.query.pageSize)
        : 10;
    const sponsorRecords = await this.sponsorService.getSponsorList(
      page,
      pageSize,
    );
    if (!sponsorRecords) {
      next(new ParameterException('没有查询到数据'));
    }
    next(new Success(sponsorRecords, '查询成功'));
  }
}
