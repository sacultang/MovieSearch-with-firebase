import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovieResult } from '../types/movieType';
import { SimilarType } from '../types/similarType';
export type ListType = {
  id: string;
  list: IMovieResult[];
};
interface InitialState {
  movie: IMovieResult | SimilarType;
  list: ListType[];
}
const initialState: InitialState = {
  movie: {
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    id: 0,
    media_type: '',
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0,
    first_air_date: '',
    name: '',
    original_name: '',
    gender: 0,
    known_for_department: '',
    profile_path: '',
  },
  list: [],
};

export const listMovieSlice = createSlice({
  name: 'listMovie',
  initialState,
  reducers: {
    setListMovieAction: (
      state: InitialState,
      action: PayloadAction<IMovieResult | SimilarType>
    ) => {
      state.movie = action.payload;
    },
    setListAction: (state: InitialState, action: PayloadAction<ListType[]>) => {
      state.list = action.payload;
    },
  },
});
export const { setListMovieAction, setListAction } = listMovieSlice.actions;
export default listMovieSlice.reducer;
