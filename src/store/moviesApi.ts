import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.themoviedb.org/3/`,
  }),

  endpoints: (builder) => {
    const TMDB_API = process.env.REACT_APP_TMDB_API;
    return {
      getDiscover: builder.query({
        query: (url: string) => ({
          url,
          method: 'GET',
          params: {
            api_key: TMDB_API,
          },
        }),
      }),
    };
  },
});

export const { useGetDiscoverQuery } = moviesApi;
