import TMDBServer from './baseUrl';
import { requestFuncType } from './constant';

export const requestData: requestFuncType = async (url, method, params) => {
  try {
    const res = await TMDBServer.request({ url, method, params });
    return res;
  } catch (error) {
    throw error;
  }
};
