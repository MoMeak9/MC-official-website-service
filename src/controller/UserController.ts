import { AppDataSource } from '../data-source';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';
import { UserService } from '../service/userService';
import { ParameterException, Success } from '../utils/HttpException';

export class UserController {
  private userRepository = AppDataSource.getRepository(User);
  private UserService = new UserService();

  async all(request: Request, response: Response, next: NextFunction) {
    return await this.userRepository.find();
  }

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
}
