import { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import CardSkeleton from '../../components/Skeleton/CardSkeleton';
import { getData } from '../../api/TMDB/Movies/getMovieAPI';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Loader from '../../components/Common/Loader';
import { IMovie } from '../../types/movieType';
import PaginationComp from '../../components/Common/PaginationComp';
const MovieCard = lazy(() => import('./MovieCard'));
const MoviePage = () => {
  const location = useLocation();
  const [movieDatas, setMovieDatas] = useState<IMovie>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userFavorite, setUserFavorite] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const fetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getData(location.pathname, page);
      setMovieDatas(res);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [location, page]);
  useEffect(() => {
    fetch();
    return () => {
      fetch();
    };
  }, [location, page]);

  const handleClick = (id: string, type: string) => {
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
      <PaginationComp setPage={setPage} />
    </Container>
  );
};

export default MoviePage;
