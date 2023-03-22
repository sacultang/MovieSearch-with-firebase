import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from './constant';
const TMDB_API = process.env.REACT_APP_TMDB_API;

const config: AxiosRequestConfig = {
  baseURL: BASE_URL,
  params: { api_key: `${TMDB_API}`, language: 'ko-KR' },
  headers: {
    'Cache-Control': 'public, max-age=600',
  },
};
const TMDBServer = axios.create(config);

const cache: { [key: string]: any } = {};

TMDBServer.interceptors.request.use(
  async (request) => {
    if (request.url) {
      const queryString = Object.entries(request.params)
        .map(
          ([key, value]) =>
            (typeof value === 'string' ||
              typeof value === 'number' ||
              typeof value === 'boolean') &&
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join('&');
      const cacheKey = `${request.url}?${queryString}`;
      if (cache[cacheKey]) {
        return Promise.resolve(cache[cacheKey]);
      }
      cache[cacheKey] = request;
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
