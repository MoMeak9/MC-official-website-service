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
    route: `${WebsiteBasePath}/gallery/add`,
    formData: true,
    controller: WebsiteController,
    action: 'addGallery',
  },
  // 周目管理
  {
    method: EMethod.GET,
    route: `${WebsiteBasePath}/period`,
    controller: WebsiteController,
    action: 'getWeek',
  },
  {
    method: EMethod.POST,
    route: `${WebsiteBasePath}/period`,
    formData: true,
    controller: WebsiteController,
    action: 'addWeek',
  },
  {
    method: EMethod.PUT,
    route: `${WebsiteBasePath}/period/:id`,
    formData: true,
    controller: WebsiteController,
    action: 'updateWeek',
  },
  {
    method: EMethod.DELETE,
    route: `${WebsiteBasePath}/period/:id`,
    formData: true,
    controller: WebsiteController,
    action: 'deleteWeek',
  },
  // 团队成员管理
  {
    method: EMethod.GET,
    route: `${WebsiteBasePath}/teamMember`,
    controller: WebsiteController,
    action: 'getTeamMember',
  },
  {
    method: EMethod.POST,
    route: `${WebsiteBasePath}/teamMember`,
    formData: true,
    controller: WebsiteController,
    action: 'addTeamMember',
  },
  {
    method: EMethod.PUT,
    route: `${WebsiteBasePath}/teamMember/:id`,
    formData: true,
    controller: WebsiteController,
    action: 'updateTeamMember',
  },
  {
    method: EMethod.DELETE,
    route: `${WebsiteBasePath}/teamMember/:id`,
    formData: true,
    controller: WebsiteController,
    action: 'deleteTeamMember',
  },
];
