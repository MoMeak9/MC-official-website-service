import { PrismaClient } from '@prisma/client';
import { Next, Req, Res } from '../config/interface';
import { queryServerInfo } from '../config/api';

const upload = require('../utils/cos');
const prisma = new PrismaClient();
const head = require('../utils/head');

export const getArticle = async (req: Req, res: Res, next: Next) => {
  const articles = await prisma.article.findMany({});
  res.send(
    head.success('', {
      articles,
    }),
  );
};

async function getServerInfo(req: Req, res: Res) {
  queryServerInfo().then((data) => {
    res.send(head.success('', data));
  });
}

async function uploadFile(req: Req, res: Res, next: Next) {
  const file = req.file;
  console.log(file);
  try {
    upload(file).then((data) => {
      res.send({
        address: `https://${data.Location}`,
      });
    });
  } catch (err) {
    res.status(500).send(head.error());
    next(err);
  }
}

async function updateVisitorNum(req: Req, res: Res, next: Next) {
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
}

module.exports = {
  getArticle,
  getServerInfo,
  uploadFile,
  updateVisitorNum,
};
