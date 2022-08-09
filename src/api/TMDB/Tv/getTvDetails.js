import TMDBServer from '../baseUrl';

export const getTvDetilas = async (url) => {
  try {
    const res = await TMDBServer({
      url: `${url}`,
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
