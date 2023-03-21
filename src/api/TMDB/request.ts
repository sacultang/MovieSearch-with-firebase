import { AxiosResponse } from 'axios';
import TMDBServer from './baseUrl';
import { requestFuncType } from './constant';

export const request = async <T>(
  url: string,
  method: string,
  params?: T
): Promise<AxiosResponse> => {
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

export const requestData: requestFuncType = async (url, method, params?) => {
  try {
    const res = await request(url, method, params);
    return res;
  } catch (error) {
    throw error;
  }
};
