import TMDBServer from '../baseUrl';

export const getSearchData = async (query) => {
  try {
    const res = await TMDBServer({
      url: 'search/tv',
      method: 'GET',
      params: {
        query: 'stranger',
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.error(e);
  }
};
