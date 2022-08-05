import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getTvData } from '../../api/TMDB/Tv/getTvAPI';
import Box from '@mui/material/Box';
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
    <Container className="inner-container">
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          margin: '0 auto',
        }}
      >
        {tvDatas.results &&
          tvDatas.results.map((tv) => (
            <div key={tv.id}>
              {isLoading ? <CardSkeleton /> : <TvCard tv={tv} />}
            </div>
          ))}
      </Box>
    </Container>
  );
};

export default TvPage;
