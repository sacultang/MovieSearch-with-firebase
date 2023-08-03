import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import { moviesApi } from './moviesApi';
import favoriteListSlice from './favoriteListSlice';
import toastSlice from './toastSlice';
import listMovieSlice from './listMovieSlice';
import themeSlice from './themeSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['favorite', 'toast', 'listMovie', 'user', 'moviesApi'],
};
const rootReducer = combineReducers({
  user: userSlice,
  [moviesApi.reducerPath]: moviesApi.reducer,
  favorite: favoriteListSlice,
  toast: toastSlice,
  listMovie: listMovieSlice,
  themeMode: themeSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(moviesApi.middleware),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
