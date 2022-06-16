import { NextFunction, Response } from 'express';
import { Request } from 'express-jwt';
import { UserService } from '../service/userService';
import { WebsiteService } from '../service/websiteService';
import { Forbidden, ParameterException, Success } from '../utils/HttpException';
import { v4 } from 'uuid';
import { md5 } from '../utils';
import { PWD_SALT } from '../config';

export class UserController {
  private UserService = new UserService();
  private WebsiteService = new WebsiteService();
  private static UserService: UserService;

  // 用户登入
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { user_password, user_email } = req.body;
    if (user_email == null || user_password == null) {
      next(new ParameterException('参数缺失'));

      return;
    }
    const result = await this.UserService.checkPassword(
      user_password,
      user_email,
    );
    if (result.length !== 0) {
      const token = await this.UserService.signToken(result[0]);
      next(new Success({ token: token, userBean: result[0] }));
    } else {
      next(new ParameterException('用户名或密码错误'));
    }
  }

  // 用户注册
  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { user_email, user_game_id, user_password, user_QQ, code } = req.body;
    if (!user_email || !user_game_id || !user_password || !user_QQ || !code) {
      next(new ParameterException('参数缺失'));
    }
    (await this.UserService.checkCode(user_email, code)) ||
      next(new ParameterException('验证码错误'));
    const result = await this.UserService.getUserByEmail(user_email);
    if (result.length !== 0) {
      next(new ParameterException('用户已存在'));
    } else {
      await this.UserService.deleteCode(user_email);
      const user = await this.UserService.createUser({
        user_uuid: v4(),
        user_email,
        user_game_id,
        user_password: md5(user_password + PWD_SALT),
        user_QQ,
      });
      const token = this.UserService.signToken(user);
      next(new Success({ token, userBean: user }, '注册成功'));
    }
  }

  // 用户更改密码
  async changePassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { id, user_email } = req.auth;
    const { user_password, new_password } = req.body;
    const result = await this.UserService.checkPassword(
      user_password,
      user_email,
    );
    if (result.length !== 0) {
      await this.UserService.updatePassword(id, new_password);
      next(new Success({}, '修改成功'));
    } else {
      next(new ParameterException('原始密码错误'));
    }
  }

  // 更新用户头像
  async updateAvatar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { user_uuid } = req.auth;
    const files = req.files;
    const user_image_url = await this.WebsiteService.uploadSingleFile(files[0]);
    await this.UserService.updateUser(user_uuid, { user_image_url });
    next(new Success({}, '更新成功'));
  }

  // 更改用户个人信息
  async updateUserInfo(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { user_uuid } = req.auth;
    const { user_game_id, user_QQ } = req.body;
    await this.UserService.updateUser(user_uuid, {
      user_game_id,
      user_QQ,
    });
    next(new Success({}, '更新成功'));
  }

  // 发送验证码
  async sendCode(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { user_email } = req.body;
    if (!user_email) {
      next(new ParameterException('参数缺失'));
    }
    if (await this.UserService.checkHasCode(user_email)) {
      const code = Math.floor(Math.random() * 9000 + 1000).toString();
      await this.UserService.createCode(user_email, code);
      await this.UserService.sendEmail(user_email, code);
      next(new Success({}, '请查收邮件'));
    } else {
      next(new ParameterException('验证码已发送，请5分钟后再试'));
    }
  }

  // 获取用户列表
  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { current, pageSize } = req.body;
    next(new Success(await this.UserService.getAllUser(current, pageSize)));
  }

  async getUserInfo(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { user_uuid } = req.auth;
    if (!user_uuid) {
      next(new ParameterException('参数缺失'));
    }
    next(
      new Success({
        userBean: (await this.UserService.getUserByUUID(user_uuid))[0],
      }),
    );
  }

  // 用户权限校验(管理员)
  static async checkAuth(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    console.log(req.auth);
    const { user_uuid } = req.auth;
    if (!user_uuid) {
      next(new ParameterException('参数缺失'));
    }
    const user = (await this.UserService.getUserByUUID(user_uuid))[0];
    user.user_role === 1 ? next() : next(new Forbidden('权限不足'));
  }

  // 用户间留言
  async leaveMessage(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { user_uuid, message_content, receive_user, userId } = req.body;
    if (!user_uuid || !message_content) {
      next(new ParameterException('参数缺失'));
    }
    await this.UserService.createMessage({
      content: message_content,
      user_uuid,
      message_to: receive_user,
      user: userId,
    });
    next(new Success({}, '留言成功'));
  }

  // 查询留言记录
}
