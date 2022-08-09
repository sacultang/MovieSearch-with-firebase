import TMDBServer from '../baseUrl';

export const getTvData = async (url: string) => {
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
