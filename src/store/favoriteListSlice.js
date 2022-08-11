import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorite: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavoriteAction: (state, action) => {
      // console.log(action.payload);
      state.favorite = [...state.favorite, action.payload];
    },
    removeFavoriteAction: (state, action) => {
      console.log(action.payload);
      state.favorite = state.favorite.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { setFavoriteAction, removeFavoriteAction } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
