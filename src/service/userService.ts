import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { Code } from '../entity/Code';
import { md5 } from '../utils';
import { EXPIRES, PRIVATE_KEY, PWD_SALT } from '../config';
import jwt = require('jsonwebtoken');
import sendMail from '../utils/sendMail';

const userSelect = {
  id: true,
  user_game_id: true,
  is_whitelist: true,
  user_score: true,
  user_email: true,
  user_uuid: true,
  user_QQ: true,
};

export class UserService {
  private userRepository = AppDataSource.getRepository(User);
  private codeRepository = AppDataSource.getRepository(Code);

  async checkPassword(
    user_password: string,
    user_email: string,
  ): Promise<Array<User>> {
    user_password = md5(user_password + PWD_SALT);

    return await this.userRepository.find({
      where: {
        user_email,
        user_password,
      },
      select: userSelect,
    });
  }

  async signToken(user: User) {
    return jwt.sign(
      {
        id: user.id,
        user_uuid: user.user_uuid,
        user_game_id: user.user_game_id,
        role: user,
      },
      PRIVATE_KEY,
      {
        expiresIn: EXPIRES,
      },
    );
  }

  async getUserByUUID(user_uuid: string): Promise<Array<User>> {
    return await this.userRepository.find({
      where: {
        user_uuid,
      },
      select: userSelect,
    });
  }

  async getUserByGameID(user_game_id: string): Promise<Array<User>> {
    return await this.userRepository.find({
      where: {
        user_game_id,
      },
      select: userSelect,
    });
  }

  async getUserByEmail(user_email: string): Promise<Array<User>> {
    return await this.userRepository.find({
      where: {
        user_email,
      },
      select: userSelect,
    });
  }

  async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async checkCode(user_email: string, code: string): Promise<boolean> {
    const result = await this.codeRepository.find({
      where: {
        user_email,
      },
    });

    return !(result.length === 0 || result[0].code !== code);
  }

  async checkHasCode(user_email: string): Promise<boolean> {
    const result = await this.codeRepository.find({
      where: {
        user_email,
      },
    });

    return result.length === 0;
  }

  sendEmail(user_email: string, code: string) {
    sendMail({
      email: user_email,
      content: `
        <p style='text-indent: 2em;'>亲爱的辉光世界注册玩家：</p>
        <p style='text-indent: 2em;'>您的注册验证码<strong>${code}</strong>，验证码5分钟内有效，请尽快使用！
        <p style='text-indent: 2em;'>祝您工作顺利，心想事成</p>
        <p style='text-align: right;'>—— 辉光世界|LightWorld</p>`,
    });
    setTimeout(() => {
      this.codeRepository.delete({
        user_email,
      }).catch(err => {
        console.log(err);
      });
    }, 300000);
  }

  async updateUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async getAllUser(): Promise<Array<User>> {
    return await this.userRepository.find();
  }
}
