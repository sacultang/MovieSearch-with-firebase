import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovie } from '../types/movieType';
interface IState {
  movie: IMovie;
}
const initialState: IState = {
  movie: {
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovieAction: (state: IState, action: PayloadAction<IMovie>) => {
      state.movie = action.payload;
    },
  },
});

export const { setMovieAction } = movieSlice.actions;
export default movieSlice.reducer;
