import { NextFunction, Response } from 'express';
import { Request } from 'express-jwt';
import { UserService } from '../service/userService';
import { WebsiteService } from '../service/websiteService';

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

    } else {

    }
  }
}
