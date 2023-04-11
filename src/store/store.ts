import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import { moviesApi } from './moviesApi';
import favoriteListSlice from './favoriteListSlice';
import toastSlice from './toastSlice';
import listMovieSlice from './listMovieSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    [moviesApi.reducerPath]: moviesApi.reducer,
    favorite: favoriteListSlice,
    toast: toastSlice,
    listMovie: listMovieSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(moviesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
