import { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import CardSkeleton from '../../components/Skeleton/CardSkeleton';
import { getMovieData } from '../../api/TMDB/Movies/getMovieAPI';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Loader from '../../components/Common/Loader';
const MovieCard = lazy(() => import('./MovieCard'));
const MoviePage = () => {
  const location = useLocation();
  const [movieDatas, setMovieDatas] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userFavorite, setUserFavorite] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const navigate = useNavigate();
  const fetch = useCallback(async () => {
    console.log(location);
    setIsLoading(true);
    try {
      const res = await getMovieData(location.pathname);
      setMovieDatas(res);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [location]);
  useEffect(() => {
    fetch();
    return () => {
      fetch();
    };
  }, [location]);

  const handleClick = (id, type) => {
    navigate(`/details/${type}/${id}`, { state: { type, id } });
  };

  //  JSX
  return (
    <Container sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {movieDatas.results &&
          movieDatas.results.map((movie) => (
            <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={movie.id}>
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <Suspense fallback={<Loader />}>
                  <MovieCard
                    userFavorite={userFavorite}
                    movie={movie}
                    setUserFavorite={setUserFavorite}
                    setFavoriteList={setFavoriteList}
                    favoriteList={favoriteList}
                    onClick={handleClick}
                  />
                </Suspense>
              )}
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default MoviePage;
