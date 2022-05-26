import { Next, Req, Res } from '../config/interface';
import { PrismaClient } from '@prisma/client';
import { commandServer } from '../config/api';

const sendMail = require('../utils/sendMail');
const head = require('../utils/head');
const correctPaper = require('../utils/correctPaper');

const prisma = new PrismaClient();

async function submitPaper(req: Req, res: Res, next: Next) {
  let { paper_content } = req.body;
  const { user_uuid, id, user_game_id } = req.user;
  let { score, percentScore } = correctPaper(paper_content);
  try {
    await prisma.paper.create({
      data: {
        user_uuid: user_uuid,
        paper_content: JSON.stringify(paper_content),
        paper_score: score,
        paper_percent: percentScore,
      },
    });
    if (score >= 60) {
      const userData = await prisma.user.update({
        where: {
          id_user_uuid: {
            id: id,
            user_uuid,
          },
        },
        data: {
          user_score: score,
          is_whitelist: 1,
        },
      });
      commandServer({
        name: 'LightWorldMC', // 服务器名字
        command: `whitelist add ${user_game_id}`, // 需要执行的命令
      })
        .then((res) => {
          console.log(res);
          sendMail({
            email: userData.user_email,
            content: `
                   <p style='text-indent: 2em;'>亲爱的${user_game_id}：</p>
                   <p style='text-indent: 2em;'>您通过了我们的白名单审核！白名单将在1分钟内生效。
                   <p style='text-indent: 2em;'>服务器地址：lw.syhwdsj.xyz</p>
                   <p style='text-align: right;'>—— 辉光世界|LightWorld</p>`,
          });
        })
        .then(() => {
          res.send(
            head.success('审核自动通过，请查收邮件', {
              score,
            }),
          );
        });
    } else {
      await prisma.user.update({
        where: {
          id_user_uuid: {
            id: id,
            user_uuid,
          },
        },
        data: {
          user_score: score,
        },
      });
      res.send(
        head.error('很遗憾审核未通过，请再试一次', {
          score,
        }),
      );
    }
  } catch (err) {
    res.status(500).send(head.error());
    next(err);
  }
}

module.exports = {
  submitPaper,
};
