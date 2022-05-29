import { NextFunction, Request, Response } from 'express';
import { UserService } from '../service/userService';
import { ParameterException, Success } from '../utils/HttpException';

export class UserController {
  private UserService = new UserService();

  async login(req: Request, res: Response, next: NextFunction) {
    const { user_password, user_email } = req.body;
    if (user_email == null || user_password == null) {
      next(new ParameterException('参数缺失'));
    }
    const result = await this.UserService.checkPassword(
      user_password,
      user_email,
    );
    if (result.length !== 0) {
      const token = this.UserService.signToken(result[0]);
      next(new Success({ token, userBean: result[0] }));
    } else {
      next(new ParameterException('用户名或密码错误'));
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const { user_email, user_game_id, user_password, user_QQ, code } = req.body;
    if (!user_email || !user_game_id || !user_password || !user_QQ || !code) {
      next(new ParameterException('参数缺失'));
    }
    const result = await this.UserService.getUserByEmail(user_email);
    if (result.length !== 0) {
      next(new ParameterException('用户已存在'));
    } else {
      const user = await this.UserService.createUser({
        user_email,
        user_game_id,
        user_password,
        user_QQ,
      });
      const token = this.UserService.signToken(user);
      next(new Success({ token, userBean: user }));
    }
  }

  async sendCode(req: Request, res: Response, next: NextFunction) {
    const { user_email } = req.body;
    if (!user_email) {
      next(new ParameterException('参数缺失'));
    }
    const result = await this.UserService.getUserByEmail(user_email);
    const code = Math.floor(Math.random() * 9000 + 1000);
    if (result.length !== 0) {
      next(new ParameterException('用户已存在'));
    } else {
      next(new Success({ code: '123456' }));
    }
  }
}
