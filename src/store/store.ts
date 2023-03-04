import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import { moviesApi } from './moviesApi';
import movieSlice from './movieSlice';
import favoriteListSlice from './favoriteListSlice';
import toastSlice from './toastSlice';
import listMovieSlice from './listMovieSlice';
// import loadingSlice from './loadingSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    [moviesApi.reducerPath]: moviesApi.reducer,
    movie: movieSlice,
    favorite: favoriteListSlice,
    toast: toastSlice,
    listMovie: listMovieSlice,
    // loadingSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(moviesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
