import TMDBServer from '../baseUrl';

export const getSearchData = async (search, page) => {
  try {
    const res = await TMDBServer({
      url: `search/movie`,
      method: 'GET',
      params: {
        language: process.env.REACT_APP_TMDB_API_LANGUAGE,
        query: search,
        page: page === undefined ? 1 : page,
      },
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
