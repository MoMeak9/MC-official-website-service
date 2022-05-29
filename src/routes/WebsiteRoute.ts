import { UserController } from '../controller/UserController';
import { EMethod, IRoute } from '../types';

const basePath = '/api/website';
export const WebsiteRoutes: Array<IRoute> = [
  {
    method: EMethod.GET,
    route: `${basePath}/getArticle`,
    controller: UserController,
    action: 'getArticle',
  },
  {
    method: EMethod.GET,
    route: `${basePath}/getServerInfo`,
    controller: UserController,
    action: 'getServerInfo',
  },
  {
    method: EMethod.POST,
    route: `${basePath}/uploadFile`,
    controller: UserController,
    action: 'uploadFile',
  },
  {
    method: EMethod.GET,
    route: `${basePath}/updatePVNum`,
    controller: UserController,
    action: 'updatePVNum',
  },
];
