import { UserController } from '../controller/UserController';
import { EMethod, IRoute } from '../types';

const UserBasePath = '/api/user';
export const UserRoutes: Array<IRoute> = [
  {
    method: EMethod.POST,
    route: `${UserBasePath}/login`,
    controller: UserController,
    action: 'login',
  },
  {
    method: EMethod.POST,
    route: `${UserBasePath}/register`,
    controller: UserController,
    action: 'register',
  },
  {
    method: EMethod.GET,
    route: `${UserBasePath}/getUserInfo`,
    controller: UserController,
    action: 'getUserInfo',
  },
  {
    method: EMethod.POST,
    route: `${UserBasePath}/sendCode`,
    controller: UserController,
    action: 'sendCode',
  },
  {
    method: EMethod.GET,
    route: `${UserBasePath}/getAllUsers`,
    controller: UserController,
    action: 'getAllUsers',
  },
  {
    method: EMethod.PUT,
    route: `${UserBasePath}`,
    controller: UserController,
    action: 'updateUserInfo',
  },
  {
    // 更新用户头像
    method: EMethod.PUT,
    route: `${UserBasePath}/avatar`,
    formData: true,
    controller: UserController,
    action: 'updateAvatar',
  },
  {
    // 用户更改密码
    method: EMethod.POST,
    route: `${UserBasePath}/changePassword`,
    controller: UserController,
    action: 'changePassword',
  },
];
