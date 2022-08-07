import TMDBServer from '../baseUrl';

export const getPersonData = async () => {
  try {
    const res = await TMDBServer({
      url: `person/popular}`,
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