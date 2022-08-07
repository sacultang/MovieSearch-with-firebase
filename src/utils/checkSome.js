export const checkClip = (movie, userFavorite) => {
  const result = userFavorite.some((item) => item.id === movie.id);
  return result;
};
