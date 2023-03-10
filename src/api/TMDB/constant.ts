export const BASE_URL = `https://api.themoviedb.org/3/`;
export type MethodType = 'GET' | 'POST';
export type requestFuncType = <T extends string | undefined, P>(
  url: T,
  method: MethodType,
  params?: P
) => Promise<any>;
