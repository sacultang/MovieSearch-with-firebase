import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getTvData } from '../../api/TMDB/Tv/getTvAPI';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CardSkeleton from '../../components/Skeleton/CardSkeleton';
import TvCard from './TvCard';
const TvPage = () => {
  const params = useParams();
  const [tvDatas, setTvDatas] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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
            <Grid item xs={12} sm={4} md={4} lg={2} key={tv.id}>
              {isLoading ? <CardSkeleton /> : <TvCard datas={tv} />}
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default TvPage;
