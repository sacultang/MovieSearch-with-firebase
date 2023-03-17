import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteWithId } from '../types/movieType';

interface InitialState {
  favoriteMovie: FavoriteWithId[];
}
const initialState: InitialState = {
  favoriteMovie: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavoriteAction: (
      state: InitialState,
      action: PayloadAction<FavoriteWithId[]>
    ) => {
      state.favoriteMovie = action.payload;
    },
  },
});

export const { setFavoriteAction } = favoriteSlice.actions;
export default favoriteSlice.reducer;
