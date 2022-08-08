import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import { moviesApi } from './moviesApi';
import movieSlice from './movieSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    [moviesApi.reducerPath]: moviesApi.reducer,
    movie: movieSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(moviesApi.middleware),
});

export default store;
