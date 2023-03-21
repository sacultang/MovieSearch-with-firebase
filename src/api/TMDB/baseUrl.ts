import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from './constant';
const TMDB_API = process.env.REACT_APP_TMDB_API;

const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
  params: { api_key: `${TMDB_API}`, language: 'ko-KR' },
};
const TMDBServer = axios.create(config);

const cache: { [key: string]: any } = {};

TMDBServer.interceptors.request.use(
  async (request) => {
    if (request.url) {
      if (cache[request.url]) {
        return Promise.resolve(cache[request.url]);
      }
      cache[request.url] = request;
      return Promise.resolve(request);
    }
    return Promise.resolve(request);
  },
  (error) => {
    return Promise.reject(error);
  }
);
TMDBServer.interceptors.response.use(
  (response) => {
    if (response.config && response.config.url) {
      if (cache[response.config.url]) {
        return Promise.resolve(response);
      }
      cache[response.config.url] = response;
      return Promise.resolve(response);
    }
    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default TMDBServer;
