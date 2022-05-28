# demo-express-http

原先自个MC服务器官网小试牛刀的demo，使用TypeScript + Express 编写，分层为service 业务层和routes路由（对应Nest的Controller控制层）。ORM 使用 Prisma ，默认MySQL，中间件只先制作了请求过滤（http-error-fliter）。

附带swagger，勤劳一点写注释哦，没得装饰器~

该项目将用Nest.js + TypeScript 重构并持续迭代，所以本库后续没有更新啦~ [地址](https://github.com/MoMeak9/MC-nest-service)

## 实现功能

### 用户

- [x] 用户登入
- [x] 用户注册
- [x] 用户信息处理
- [x] 邮件验证码
- [x] 更新用户信息、上传头像

### 服务器

- [x] 游戏服务器信息获取
- [x] 服务器状态监控
- [ ] 站点监控

### 问卷

- [x] 提交问卷
- [x] 自动审核问卷

### Admin

- [x] Ban 人~
- [x] 玩家状态和信息管理

## 额外配置项

- COS 密钥
- MCSM 的api Key（如果附带我的世界面板的相关接口）
- `DATABASE_URL=""`

## 使用

开发环境启动

```shell
npm run dev
# set NODE_ENV=development&& nodemon src/app.ts
```

生产环境启动

```shell
npm run pro
# set NODE_ENV=production&& nodemon src/app.ts
```

发布（tsc转换，未使用webpack哦~）

```shell
npm run build
```

## 部署

使用serverless，请配置好`scf_bootstrap`

```shell
#!/usr/bin/env bash
/var/lang/node12/bin/node ./dist/app.js
```

tsc导出位置`dist`





