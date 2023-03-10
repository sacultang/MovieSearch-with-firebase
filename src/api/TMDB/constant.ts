import { AxiosResponse } from 'axios';
export const BASE_URL = `https://api.themoviedb.org/3/`;

export const METHOD_CONS = { get: 'GET', post: 'POST' };
export type requestFuncType = <T extends string | undefined, P>(
  url: T,
  method: string,
  params?: P
) => Promise<AxiosResponse>;
