import request from '../utils/require';

const { KEY } = require('../config');
type Command = {
  name: string;
  command: string;
};
export const api = {
  getServerInfo: '/status/LightWorldMC',
  commandServer: `/execute/?apikey=${KEY}`,
};

export function queryServerInfo() {
  return request({
    url: api.getServerInfo,
    method: 'get',
  });
}

export function commandServer(param: Command) {
  return request({
    url: api.commandServer,
    method: 'post',
    data: param,
  });
}
