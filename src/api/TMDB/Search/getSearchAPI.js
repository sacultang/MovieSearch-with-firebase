import TMDBServer from '../baseUrl';

export const getSearchData = async (query) => {
  try {
    const res = await TMDBServer({
      url: 'search/multi',
      method: 'GET',
      params: {
        query,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.error(e);
  }
};

export const getTrailer = async (id, type) => {
  console.log(type);
  try {
    const res = await TMDBServer({
      url: `${type}/${id}/videos`,
      method: 'GET',
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.error(e);
  }
};
