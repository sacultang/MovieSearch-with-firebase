import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorite: [],
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    setFavoriteAction: (state, action) => {
      state.favorite = action.payload;
    },
  },
});

export const { setFavoriteAction } = favoriteSlice.actions;
export default favoriteSlice.reducer;
