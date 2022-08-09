import axios from 'axios';

const TMDB_API = process.env.REACT_APP_TMDB_API;

const TMDBServer = axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
  params: {
    api_key: `${TMDB_API}`,
    language: 'ko-KR',
  },
});
export default TMDBServer;

export const requestHome = async (url: string) => {
  try {
    const res = await TMDBServer({
      url,
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    console.log(e);
  }
};
