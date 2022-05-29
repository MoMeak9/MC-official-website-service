import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { md5 } from '../utils';
import { EXPIRES, PRIVATE_KEY, PWD_SALT } from '../config';
import jwt = require('jsonwebtoken');

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

  async getAllUser(): Promise<Array<User>> {
    return await this.userRepository.find();
  }
}
