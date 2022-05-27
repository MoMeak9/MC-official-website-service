import { PrismaClient } from '@prisma/client';
import { Next, Req, Res } from '../config/interface';
import { queryServerInfo } from '../config/api';
import { ServerError, Success } from '../utils/HttpException';

const upload = require('../utils/cos');
const prisma = new PrismaClient();
const head = require('../utils/head');

export const getArticle = async (req: Req, res: Res, next: Next) => {
  const articles = await prisma.article.findMany({});
  next(new Success(articles));
};

// 获取游戏服务器信息
export const getServerInfo = (req: Req, res: Res, next: Next) => {
  queryServerInfo()
    .then((data) => {
      next(new Success(data));
    })
    .catch(() => {
      next(new ServerError());
    });
};

// 上传文件
export const uploadFile = (req: Req, res: Res, next: Next) => {
  const file = req.file;
  upload(file)
    .then((data) => {
      next(
        new Success({
          address: `https://${data.Location}`,
        }),
      );
    })
    .catch(() => {
      next(new ServerError());
    });
};

// 站点UV统计
export const updateUVNum = async (req: Req, res: Res, next: Next) => {
  try {
    await prisma.counter.updateMany({
      where: { count_item: { contains: 'visitors' } },
      data: { count_num: { increment: 1 } },
    });
    const update = await prisma.counter.findMany({
      where: { count_item: { contains: 'visitors' } },
      select: { count_num: true },
    });
    res.send(head.success('', update));
  } catch (err) {
    res.send(head.error());
    next(err);
  }
};

// 站点PV统计
export const updatePVNum = async (req: Req, res: Res, next: Next) => {
};
