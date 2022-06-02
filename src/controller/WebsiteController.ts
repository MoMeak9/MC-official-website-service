import { NextFunction, Response } from 'express';
import { Req } from '../types';
import { UserService } from '../service/userService';
import { WebsiteService } from '../service/websiteService';
import { ServerError, Success } from '../utils/HttpException';

export class WebsiteController {
  private UserService = new UserService();
  private WebsiteService = new WebsiteService();

  // 提交试卷
  async submitPaper(req: Req, res: Response, next: NextFunction) {
    const { paper_content } = req.body;
    const { user_uuid, id, user_game_id, user_email } = req.auth;
    const { score, percentScore } = this.WebsiteService.getScore(paper_content);
    await this.WebsiteService.addPaper({
      user_uuid,
      paper_content: JSON.stringify(paper_content),
      paper_percent: percentScore,
      paper_score: score,
      id,
    });
    await this.UserService.setScore(user_uuid, percentScore);
    if (percentScore >= 60) {
      await this.WebsiteService.addWhitelist(user_game_id);
      await this.WebsiteService.sendPassEmail(user_game_id, user_email);
      next(
        new Success(
          {
            paper_score: score,
            paper_percent: percentScore,
          },
          '审核自动通过，请查收邮件',
        ),
      );
    } else {
      await this.WebsiteService.sendFailPassEmail(user_game_id, user_email);
      next(
        new Success(
          {
            paper_score: score,
            paper_percent: percentScore,
          },
          '审核未通过，请查收邮件',
        ),
      );
    }
  }

  // 获取COS密钥
  async getCosSecret(req: Req, res: Response, next: NextFunction) {
    await this.WebsiteService.getCosSecret();
    next(new Success('获取成功'));
  }

  async uploadSingleFile(req: Req, res: Response, next: NextFunction) {
    const files = req.files;
    console.log(files);
    const data = await this.WebsiteService.uploadSingleFile(files[0]);
    next(new Success({ fileUrl: data }, '上传成功'));
  }

  async uploadMultipleFile(req: Req, res: Response, next: NextFunction) {
    const files = req.files;
    const data = await this.WebsiteService.uploadMultipleFile(files);
    next(new Success({ fileUrl: data }, '上传成功'));
  }

  async addGallery(req: Req, res: Response, next: NextFunction) {
    try {
      const { id } = req.auth;
      const { title, description } = req.body;
      const files = req.files;
      const fileUrl = await this.WebsiteService.uploadSingleFile(files[0]);
      const data = await this.WebsiteService.addGallery({
        user: id,
        img_url: fileUrl,
        title,
        description,
      });
      next(new Success(data, '添加成功'));
    } catch (e) {
      next(new ServerError('服务器异常'));
    }
  }
}
