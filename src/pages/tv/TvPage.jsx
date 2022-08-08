import { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { getTvData } from '../../api/TMDB/Tv/getTvAPI';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CardSkeleton from '../../components/Skeleton/CardSkeleton';

import Loader from '../../components/Common/Loader';
const MovieCard = lazy(() => import('../movies/MovieCard'));
const TvPage = () => {
  const params = useParams();
  const [tvDatas, setTvDatas] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userFavorite, setUserFavorite] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const fetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getTvData(params.query);
      setTvDatas(res);
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
  return (
    <Container sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {tvDatas.results &&
          tvDatas.results.map((tv) => (
            <Grid item xs={12} sm={8} md={4} lg={2} key={tv.id}>
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
                  />
                </Suspense>
              )}
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default TvPage;
