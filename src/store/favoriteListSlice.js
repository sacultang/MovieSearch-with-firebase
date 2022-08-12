import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  favorite: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavoriteAction: (state, action) => {
      // console.log('payload', action.payload.id);
      // const favoriteList = Array.from(current(state.favorite));
      // console.log('favoriteList', favoriteList);
      // const result = favoriteList.filter((item) => item.id);
      // console.log('results', result);
      state.favorite = action.payload;
    },
    removeFavoriteAction: (state, action) => {
      state.favorite = state.favorite.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { setFavoriteAction, removeFavoriteAction } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
