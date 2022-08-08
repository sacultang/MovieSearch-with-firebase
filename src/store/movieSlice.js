import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movie: {},
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovieAction: (state, action) => {
      console.log(action.payload);
      state.movie = action.payload;
    },
  },
});

export const { setMovieAction } = movieSlice.actions;
export default movieSlice.reducer;
