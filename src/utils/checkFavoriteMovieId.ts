import { FavoriteWithId } from '../types/movieType';
export const checkFavoriteMovieId = (
  movieId: number | string,
  userFavorite: FavoriteWithId[]
) => {
  const result = userFavorite.some((item) => item.id === movieId.toString());
  return result;
};
