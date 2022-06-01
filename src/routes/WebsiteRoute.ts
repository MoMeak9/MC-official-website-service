import { WebsiteController } from '../controller/WebsiteController';
import { EMethod, IRoute } from '../types';

const WebsiteBasePath = '/api/website';
const PaperBasePath = '/api/paper';
export const WebsiteRoutes: Array<IRoute> = [
  {
    method: EMethod.GET,
    route: `${WebsiteBasePath}/getArticle`,
    controller: WebsiteController,
    action: 'getArticle',
  },
  {
    method: EMethod.GET,
    route: `${WebsiteBasePath}/getServerInfo`,
    controller: WebsiteController,
    action: 'getServerInfo',
  },
  {
    method: EMethod.POST,
    route: `${WebsiteBasePath}/uploadFile`,
    controller: WebsiteController,
    action: 'uploadFile',
  },
  {
    method: EMethod.GET,
    route: `${WebsiteBasePath}/updatePVNum`,
    controller: WebsiteController,
    action: 'updatePVNum',
  },
  {
    method: EMethod.POST,
    route: `${PaperBasePath}/submitPaper`,
    controller: WebsiteController,
    action: 'submitPaper',
  },
  {
    method: EMethod.GET,
    route: `${WebsiteBasePath}/getCosSecret`,
    controller: WebsiteController,
    action: 'getCosSecret',
  },
  {
    method: EMethod.POST,
    route: `${WebsiteBasePath}/uploadSingleFile`,
    formData: true,
    controller: WebsiteController,
    action: 'uploadSingleFile',
  },
  {
    method: EMethod.POST,
    route: `${WebsiteBasePath}/uploadMultipleFile`,
    formData: true,
    controller: WebsiteController,
    action: 'uploadMultipleFile',
  },
  {
    method: EMethod.POST,
    route: `${WebsiteBasePath}/addGallery`,
    controller: WebsiteController,
    action: 'addGallery',
  },
];
