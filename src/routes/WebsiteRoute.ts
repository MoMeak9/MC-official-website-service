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
    route: `${WebsiteBasePath}/getWeek`,
    controller: WebsiteController,
    action: 'getWeek',
  },
  {
    method: EMethod.POST,
    route: `${WebsiteBasePath}/addWeek`,
    formData: true,
    controller: WebsiteController,
    action: 'addWeek',
  },
  {
    method: EMethod.POST,
    route: `${WebsiteBasePath}/updateWeek`,
    formData: true,
    controller: WebsiteController,
    action: 'updateWeek',
  },
  {
    method: EMethod.POST,
    route: `${WebsiteBasePath}/deleteWeek`,
    formData: true,
    controller: WebsiteController,
    action: 'deleteWeek',
  },
  {
    method: EMethod.POST,
    route: `${WebsiteBasePath}/addWeekPaper`,
    formData: true,
    controller: WebsiteController,
    action: 'addWeekPaper',
  },
  // 团队成员管理
  {
    method: EMethod.GET,
    route: `${WebsiteBasePath}/getTeamMember`,
    controller: WebsiteController,
    action: 'getTeamMember',
  },
  {
    method: EMethod.POST,
    route: `${WebsiteBasePath}/addTeamMember`,
    formData: true,
    controller: WebsiteController,
    action: 'addTeamMember',
  },
  {
    method: EMethod.POST,
    route: `${WebsiteBasePath}/updateTeamMember`,
    formData: true,
    controller: WebsiteController,
    action: 'updateTeamMember',
  },
  {
    method: EMethod.POST,
    route: `${WebsiteBasePath}/deleteTeamMember`,
    formData: true,
    controller: WebsiteController,
    action: 'deleteTeamMember',
  },
];
