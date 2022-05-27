import { md5 } from '../utils';
import { Next, Req, Res } from '../config/interface';

const upload = require('../utils/cos');
import sendMail from '../utils/sendMail';
import { PrismaClient } from '@prisma/client';
import { v4 } from 'uuid';
import jwt = require('jsonwebtoken');
import { PWD_SALT, PRIVATE_KEY, EXPIRES } from '../config';
import {
  AuthFailed,
  ParameterException,
  Success,
} from '../utils/HttpException';

const head = require('../utils/head');
const prisma = new PrismaClient();

export const login = async (req: Req, res: Res, next: Next) => {
  let { user_password } = req.body;
  const { user_email } = req.body;
  if (user_email == null || user_password == null) {
    next(new ParameterException('参数缺失'));
  } else {
    user_password = md5(user_password + PWD_SALT);
    const result = await prisma.user.findMany({
      where: {
        user_email,
        user_password,
      },
      select: {
        id: true,
        user_game_id: true,
        is_whitelist: true,
        user_score: true,
        user_email: true,
        user_uuid: true,
        user_QQ: true,
      },
    });
    if (result.length === 0) {
      next(new AuthFailed('用户名或密码错误'));
    } else {
      const token = jwt.sign(
        {
          id: result[0].id,
          user_uuid: result[0].user_uuid,
          user_game_id: result[0].user_game_id,
          role: result[0],
        },
        PRIVATE_KEY,
      );
      next(
        new Success({
          token,
          userBean: result[0],
        }),
      );
    }
  }
};

export const register = async (req: Req, res: Res, next: Next) => {
  const { user_email, user_game_id, user_password, user_QQ, code } = req.body;
  try {
    const result = await prisma.user.findMany({
      where: {
        user_email,
      },
    });
    if (user_email == null || user_game_id == null || user_password == null) {
      res.send({ code: -1, msg: '关键信息为空' });
    } else if (!result || result.length === 0) {
      const checkCode = await prisma.code.findUnique({
        where: {
          user_email,
        },
        select: {
          code: true,
        },
      });
      if (checkCode == null) {
        res.send(head.error('验证码已过期'));
      } else if (checkCode.code != code) {
        res.send(head.error('验证码错误'));
      } else {
        const user_uuid = v4();
        const password = md5(user_password + PWD_SALT);
        await prisma.user.create({
          data: {
            user_game_id,
            user_password: password,
            user_email,
            user_uuid,
            user_QQ,
          },
        });
        res.send(head.success());
        await prisma.code.delete({
          where: {
            user_email,
          },
        });
      }
    } else {
      res.send(head.error('账户已存在'));
    }
  } catch (err) {
    res.status(500).send(head.error());
    next(err);
  }
};

export const getUserInfo = async (req: Req, res: Res, next: Next) => {
  const { user_uuid } = req.auth;
  console.log(user_uuid);
  const result = await prisma.user.findMany({
    where: {
      user_uuid,
    },
    select: {
      user_game_id: true,
      is_whitelist: true,
      user_score: true,
      user_email: true,
      user_uuid: true,
      user_QQ: true,
    },
  });
  next(
    new Success({
      userBean: result[0],
    }),
  );
};

export const sendCode = async (req: Req, res: Res, next: Next) => {
  const { user_email } = req.body;
  const code = Math.floor(Math.random() * 9000 + 1000);

  function send() {
    sendMail({
      email: user_email,
      content: `
        <p style='text-indent: 2em;'>亲爱的辉光世界注册玩家：</p>
        <p style='text-indent: 2em;'>您的注册验证码<strong>${code}</strong>，验证码5分钟内有效，请尽快使用！
        <p style='text-indent: 2em;'>祝您工作顺利，心想事成</p>
        <p style='text-align: right;'>—— 辉光世界|LightWorld</p>`,
    });
    res.send(head.success('请查收邮箱'));
    setTimeout(async function() {
      await prisma.code.delete({
        where: {
          user_email,
        },
      });
    }, 300000);
  }

  const result = await prisma.code.findMany({
    where: { user_email },
  });
  if (
    result.length !== 0 &&
    Date.now() - Date.parse(result[0].code_time.toString()) <= 120000
  ) {
    res.send(head.error('请两分钟后重试'));
  } else if (result.length !== 0) {
    await prisma.code.delete({
      where: { user_email },
    });
    await prisma.code.create({
      data: {
        user_email,
        code: code,
        code_time: new Date(),
      },
    });
    send();
  } else {
    await prisma.code.create({
      data: {
        user_email,
        code: code,
        code_time: new Date(),
      },
    });
    send();
  }
};

export const getAllUsers = async (req: Req, res: Res, next: Next) => {
  const result = await prisma.user.findMany({
    select: {
      user_game_id: true,
      user_uuid: true,
      user_image_url: true,
      is_whitelist: true,
      user_is_ban: true,
    },
  });
  next(new Success({ users: result }));
};

async function updateUserImg(req: Req, res: Res, next: Next) {
  const { user_uuid, id } = req.auth;
  if (req.file != null && req.file.length !== 0) {
    const file = req.file;
    try {
      upload(file).then((data) => {
        const address = `https://${data.Location}`;
        prisma.user
          .update({
            where: { id_user_uuid: { id, user_uuid } },
            data: { user_image_url: address },
          })
          .then(() => {
            res.send(head.success('更新成功'));
          });
      });
    } catch (err) {
      res.send(head.error('参数缺失'));
      next(err);
    }
  } else {
    res.send(head.error());
  }
}

async function updateUserInfo(req: Req, res: Res, next: Next) {
  const { user_uuid, id } = req.auth;
  const { user_game_id, user_email, user_QQ } = req.body;
  try {
    await prisma.user.update({
      where: { id_user_uuid: { id, user_uuid } },
      data: {
        user_game_id,
        user_email,
        user_QQ,
      },
    });
    res.send(head.success('更新成功'));
  } catch (err) {
    res.send(head.error());
    next(err);
  }
}

async function changePassword(req: Req, res: Res, next: Next) {
  const { id, user_uuid } = req.auth;
  let { user_password, user_new_password } = req.body;
  user_password = md5(user_password + PWD_SALT);
  try {
    const result = await prisma.user.findUnique({
      where: {
        id_user_uuid: { id, user_uuid },
      },
      select: { user_password: true },
    });
    if (result.user_password != user_password) {
      res.send(head.error('密码错误'));
    } else {
      user_new_password = md5(user_new_password + PWD_SALT);
      await prisma.user.update({
        where: { id_user_uuid: { id, user_uuid } },
        data: { user_password: user_new_password },
      });
    }
  } catch (err) {
    res.send(head.error());
    next(err);
  }
}

export default {
  login,
  register,
  getUserInfo,
  sendCode,
  getAllUsers,
  updateUserInfo,
  updateUserImg,
  changePassword,
};
