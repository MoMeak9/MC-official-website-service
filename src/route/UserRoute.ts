import { UserController } from '../controller/UserController';

const basePath = '/api/user';
export const UserRoutes: Array<any> = [
  {
    method: 'post',
    route: `${basePath}/login`,
    controller: UserController,
    action: 'login',
  },
  {
    method: 'post',
    route: `${basePath}/register`,
    controller: UserController,
    action: 'register',
  },
  {
    method: 'get',
    route: `${basePath}/getUserInfo`,
    controller: UserController,
    action: 'getUserInfo',
  },
  {
    method: 'post',
    route: `${basePath}/sendCode`,
    controller: UserController,
    action: 'sendCode',
  },
  {
    method: 'get',
    route: `${basePath}/getAllUsers`,
    controller: UserController,
    action: 'getAllUsers',
  },
  {
    method: 'post',
    route: `${basePath}/updateUserInfo`,
    controller: UserController,
    action: 'updateUserInfo',
  },
  {
    method: 'post',
    route: `${basePath}/updateUserImg`,
    controller: UserController,
    action: 'updateUserImg',
  },
  {
    method: 'post',
    route: `${basePath}/changePassword`,
    controller: UserController,
    action: 'changePassword',
  },
];
