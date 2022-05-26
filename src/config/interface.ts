import { NextFunction, Request, Response } from 'express';

export interface Req extends Request {
  user: any;
  file: any;
}

export interface Res extends Response {}

export interface Next extends NextFunction {}
