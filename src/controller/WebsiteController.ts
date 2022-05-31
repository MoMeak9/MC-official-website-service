import { NextFunction, Response } from 'express';
import { Request } from 'express-jwt';
import { UserService } from '../service/userService';
import { WebsiteService } from '../service/websiteService';
import { Success } from '../utils/HttpException';

export class WebsiteController {
  private UserService = new UserService();
  private WebsiteService = new WebsiteService();

  // 提交试卷
  async submitPaper(req: Request, res: Response, next: NextFunction) {
    const { paper_content } = req.body;
    const { user_uuid, id, user_game_id, user_email } = req.auth;
    const { score, percentScore } = this.WebsiteService.getScore(paper_content);
    await this.WebsiteService.addPaper({
      user_uuid,
      paper_content,
      paper_percent: percentScore,
      paper_score: score,
      id,
    });
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
}
