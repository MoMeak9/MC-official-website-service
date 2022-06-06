import { SponsorController } from '../controller/SponsorController';
import { EMethod, IRoute } from '../types';

const basePath = '/api/sponsor';
export const SponsorRoutes: Array<IRoute> = [
  {
    method: EMethod.GET,
    route: `${basePath}`,
    controller: SponsorController,
    action: 'getSponsors',
  },
  {
    method: EMethod.POST,
    route: `${basePath}`,
    controller: SponsorController,
    action: 'createSponsor',
  },
  {
    method: EMethod.PUT,
    route: `${basePath}/:id`,
    controller: SponsorController,
    action: 'updateSponsor',
  },
  {
    method: EMethod.DELETE,
    route: `${basePath}/:id`,
    controller: SponsorController,
    action: 'deleteSponsor',
  },
  {
    method: EMethod.GET,
    route: `${basePath}/list`,
    controller: SponsorController,
    action: 'getSponsorList',
  },
];
