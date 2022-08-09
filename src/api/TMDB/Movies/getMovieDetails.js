import TMDBServer from '../baseUrl';

export const getMovieDetails = async (query) => {
  try {
    const res = await TMDBServer({
      url: `movie/${query}`,
      method: 'GET',
    });
    if (res.status === 200) {
      return res.data;
    } else {
      const errData = await res.data;
      throw errData;
    }
  } catch (e) {
    console.error(e);
  }
};
