import { AxiosResponse } from 'axios';
export const BASE_URL = `https://api.themoviedb.org/3/`;

export const METHOD_CONS = { get: 'GET', post: 'POST' };
export type requestFuncType = <T>(
  url: string,
  method: string,
  params?: T
) => Promise<AxiosResponse>;
