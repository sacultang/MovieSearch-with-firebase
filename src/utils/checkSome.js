export const checkClip = (movieId, userFavorite) => {
  const result = userFavorite.some((item) => item.id === movieId.toString());
  return result;
};
