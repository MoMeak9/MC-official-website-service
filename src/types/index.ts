export enum EMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface IRoute {
  method: EMethod;
  route: string;
  controller: any;
  action: string;
}

export interface IPaperQuestion {
  type?: string;
  score?: number;
  content?: string;
  solution?: string;
}
