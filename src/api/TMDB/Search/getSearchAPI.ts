import TMDBServer from '../baseUrl';

export const getSearchData = async (query: string) => {
  try {
    const res = await TMDBServer({
      url: 'search/multi',
      method: 'GET',
      params: {
        query: query!,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.error(e);
  }
};

export const getTrailer = async (url: string) => {
  try {
    const res = await TMDBServer({
      url: `${url}/videos`,
      method: 'GET',
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.error(e);
  }
};
