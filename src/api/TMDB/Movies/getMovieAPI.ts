import TMDBServer from '../baseUrl';

export const getMovieData = async (url: string, page: number) => {
  try {
    const res = await TMDBServer({
      url: `${url}`,
      method: 'GET',
      params: { page },
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
