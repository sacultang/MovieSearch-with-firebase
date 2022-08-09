import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.themoviedb.org/3/`,
  }),

  endpoints: (builder) => {
    const TMDB_API = process.env.REACT_APP_TMDB_API;
    return {
      getMovie: builder.query({
        query: (query) => ({
          url: `movie/${query}`,
          method: 'GET',
          params: {
            api_key: TMDB_API,
          },
        }),
      }),
      getDiscover: builder.query({
        query: () => ({
          url: `/discover/movie?with_network=123&language=en-US`,
          method: 'GET',
          params: {
            api_key: TMDB_API,
          },
        }),
      }),
    };
  },
});

export const { useGetMovieQuery, useGetDiscoverQuery } = moviesApi;
