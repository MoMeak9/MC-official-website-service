import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { Paper } from '../entity/Paper';
import { commandServer } from '../config/api';
import { correctPaper } from '../utils/correctPaper';
import { IPaperQuestion } from '../types';
import sendMail from '../utils/sendMail';

export class WebsiteService {
  private userRepository = AppDataSource.getRepository(User);
  private paperRepository = AppDataSource.getRepository(Paper);

  // 新增考试记录
  async addPaper(paper: Paper) {
    return await this.paperRepository.save(paper);
  }

  getUserPaper(user_uuid: string) {
    return this.paperRepository.find({
      where: {
        user_uuid,
      },
    });
  }

  // 批改试卷
  getScore(paper_content: IPaperQuestion[]): {
    score: number;
    percentScore: number;
  } {
    return correctPaper(paper_content);
  }

  async sendPassEmail(user_game_id, user_email) {
    await sendMail({
      email: user_email,
      content: `
        <p style='text-indent: 2em;'>亲爱的${user_game_id}：</p>
        <p style='text-indent: 2em;'>您通过了我们的白名单审核！白名单将在1分钟内生效。
        <p style='text-indent: 2em;'>服务器地址：game.lwmc.net</p>
        <p style='text-align: right;'>—— 辉光世界|LightWorld</p>`,
    });
  }

  async sendFailPassEmail(user_game_id, user_email) {
    await sendMail({
      email: user_email,
      content: `
        <p style='text-indent: 2em;'>亲爱的${user_game_id}：</p>
        <p style='text-indent: 2em;'>您的白名单审核未通过！请再次检查您的试卷答案并重新提交，如有疑问请联系我们的客服。
        <p style='text-align: right;'>—— 辉光世界|LightWorld</p>`,
    });
  }

  async addWhitelist(user_game_id: string) {
    await commandServer({
      name: 'LightWorldMC', // 服务器名字
      command: `whitelist add ${user_game_id}`, // 需要执行的命令
    });
  }

  async removeWhitelist(user_game_id: string) {
    await commandServer({
      name: 'LightWorldMC', // 服务器名字
      command: `whitelist remove ${user_game_id}`, // 需要执行的命令
    });
  }
}
