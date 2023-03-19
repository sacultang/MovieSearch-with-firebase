import { AxiosResponse } from 'axios';
export const BASE_URL = `https://api.themoviedb.org/3/`;
export type requestFuncType = <T>(
  url: string,
  method: string,
  params?: T
) => Promise<AxiosResponse>;
