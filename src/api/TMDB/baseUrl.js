import axios from 'axios';

const TMDB_API = process.env.REACT_APP_TMDB_API;

const TMDBServer = axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
  params: {
    api_key: `${TMDB_API}`,
  },
});
export default TMDBServer;
