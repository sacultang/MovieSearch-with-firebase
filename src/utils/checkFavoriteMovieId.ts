import { FavoriteWithId, IMovieResult } from '../types/movieType';
export const checkFavoriteMovieId = (
  movieId: number | string,
  userFavorite: FavoriteWithId[]
) => {
  const result = userFavorite.some((item) => item.id === movieId.toString());
  return result;
};

export const checkListMovieId = (
  movieId: string | number,
  selectMovieList: IMovieResult[]
) => {
  const result = selectMovieList.some((item) => item.id === movieId);

  console.log(result);
  return result;
};
