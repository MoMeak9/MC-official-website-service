import { PrismaClient } from '@prisma/client';
import { Next, Req, Res } from '../config/interface';

const head = require('../utils/head');
const prisma = new PrismaClient();

async function setUserState(req: Req, res: Res, next: Next) {
  const { user_uuid, id, state } = req.body;
  try {
    await prisma.user.update({
      where: {
        id_user_uuid: { user_uuid, id },
      },
      data: { user_is_ban: Number(state) },
    });
  } catch (err) {
    res.send(head.error());
    next(err);
  }
}
