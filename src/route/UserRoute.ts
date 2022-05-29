import { UserController } from '../controller/UserController';

export const UserRoutes: Array<any> = [
  {
    method: 'get',
    route: '/users',
    controller: UserController,
    action: 'all',
  },
  {
    method: 'post',
    route: '/api/user/login',
    controller: UserController,
    action: 'login',
  },
];
