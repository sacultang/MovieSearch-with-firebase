import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { IMovieResult } from '../types/movieType';
import { Similrar } from '../types/similarType';
type ListType = {
  id: string;
  list: IMovieResult[];
};
interface InitialState {
  movie: IMovieResult[] | Similrar[];
  list: ListType[];
}
const initialState: InitialState = {
  movie: [],
  list: [],
};

export const listMovieSlice = createSlice({
  name: 'listMovie',
  initialState,
  reducers: {
    setListMovieAction: (state, action) => {
      console.log(current(state.movie));
      console.log(action.payload);
      state.movie = [...state.movie, action.payload];
    },
    setListAction: (state: InitialState, action: PayloadAction<ListType[]>) => {
      state.list = action.payload;
    },
  },
});
export const { setListMovieAction, setListAction } = listMovieSlice.actions;
export default listMovieSlice.reducer;
