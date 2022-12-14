import { createSlice } from '@reduxjs/toolkit';
import { IMovieResult } from '../types/movieType';
import { Similrar } from '../types/similarType';
type ListType = {
  id: string;
  list: [];
};
interface IState {
  movie: IMovieResult[] | Similrar[];
  list: ListType[];
}
const initialState: IState = {
  movie: [],
  list: [],
};

export const listMovieSlice = createSlice({
  name: 'listMovie',
  initialState,
  reducers: {
    setListMovieAction: (state, action) => {
      state.movie = [...state.movie, action.payload];
    },
    setListAction: (state, action) => {
      state.list = action.payload;
    },
  },
});
export const { setListMovieAction, setListAction } = listMovieSlice.actions;
export default listMovieSlice.reducer;
