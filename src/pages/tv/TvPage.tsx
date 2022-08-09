import { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getData } from '../../api/TMDB/Movies/getMovieAPI';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CardSkeleton from '../../components/Skeleton/CardSkeleton';

import Loader from '../../components/Common/Loader';
import PaginationComp from '../../components/Common/PaginationComp';
import { IMovie } from '../../types/movieType';
const MovieCard = lazy(() => import('../movies/MovieCard'));
const TvPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tvDatas, setTvDatas] = useState<IMovie>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userFavorite, setUserFavorite] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [page, setPage] = useState(1);
  const fetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getData(location.pathname, page);
      setTvDatas(res);
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
  return (
    <Container sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {tvDatas.results &&
          tvDatas.results.map((tv) => (
            <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={tv.id}>
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <Suspense fallback={<Loader />}>
                  <MovieCard
                    userFavorite={userFavorite}
                    movie={tv}
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

export default TvPage;
