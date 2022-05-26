import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const schedule = require('node-schedule');

// 定义规则
const rule = new schedule.RecurrenceRule();
rule.second = [0, 10, 20, 30, 40, 50]; // 每隔 10 秒执行一次

// 启动任务
export function scheduleJobs() {
  clearNum();
}

function clearNum() {
  schedule.scheduleJob('0 0 0 * * *', () => {
    try {
      prisma.counter.update({ where: { id: 2 }, data: { count_num: 0 } });
    } catch (err) {
      console.log(err);
    }
  });
}
