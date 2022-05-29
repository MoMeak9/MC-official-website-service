import { UserController } from '../controller/UserController';
import { EMethod, IRoute } from '../types';

const basePath = '/api/user';
export const UserRoutes: Array<IRoute> = [
  {
    method: EMethod.POST,
    route: `${basePath}/login`,
    controller: UserController,
    action: 'login',
  },
  {
    method: EMethod.POST,
    route: `${basePath}/register`,
    controller: UserController,
    action: 'register',
  },
  {
    method: EMethod.GET,
    route: `${basePath}/getUserInfo`,
    controller: UserController,
    action: 'getUserInfo',
  },
  {
    method: EMethod.POST,
    route: `${basePath}/sendCode`,
    controller: UserController,
    action: 'sendCode',
  },
  {
    method: EMethod.GET,
    route: `${basePath}/getAllUsers`,
    controller: UserController,
    action: 'getAllUsers',
  },
  {
    method: EMethod.POST,
    route: `${basePath}/updateUserInfo`,
    controller: UserController,
    action: 'updateUserInfo',
  },
  {
    method: EMethod.POST,
    route: `${basePath}/updateUserImg`,
    controller: UserController,
    action: 'updateUserImg',
  },
  {
    method: EMethod.POST,
    route: `${basePath}/changePassword`,
    controller: UserController,
    action: 'changePassword',
  },
];
