import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BASE_URL, requestFuncType } from './constant';
const TMDB_API = process.env.REACT_APP_TMDB_API;

const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
  params: { api_key: `${TMDB_API}`, language: 'ko-KR' },
};
const TMDBServer = axios.create(config);
export default TMDBServer;

export const request = async <T extends string | undefined, P>(
  url: T,
  method: string,
  params?: P
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
