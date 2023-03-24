import TMDBServer from './baseUrl';
import { requestFuncType } from './constant';

export const request: requestFuncType = async (url, method, params) => {
  try {
    const response = await TMDBServer.request({
      url,
      method,
      params,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const requestData: requestFuncType = async (url, method, params) => {
  try {
    const res = await request(url, method, params);
    return res;
  } catch (error) {
    throw error;
  }
};
