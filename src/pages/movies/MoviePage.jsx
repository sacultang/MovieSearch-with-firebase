import { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import CardSkeleton from '../../components/Skeleton/CardSkeleton';
import { getMovieData } from '../../api/TMDB/Movies/getMovieAPI';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Loader from '../../components/Common/Loader';
const MovieCard = lazy(() => import('./MovieCard'));
const MoviePage = () => {
  const params = useParams();
  const [movieDatas, setMovieDatas] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userFavorite, setUserFavorite] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const fetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getMovieData(params.query);
      setMovieDatas(res);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [params]);
  useEffect(() => {
    fetch();
    return () => {
      fetch();
    };
  }, [params]);

  //  JSX
  return (
    <Container sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {movieDatas.results &&
          movieDatas.results.map((movie) => (
            <Grid item xs={12} sm={4} md={4} lg={2} key={movie.id}>
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
