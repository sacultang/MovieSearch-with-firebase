import { useEffect, useState, useCallback, lazy, Suspense } from 'react';

import { getData } from '../../api/TMDB/Movies/getMovieAPI';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Loader from '../../components/Common/Loader';
import { IMovie } from '../../types/movieType';
import PaginationComp from '../../components/Common/PaginationComp';
import PageTitle from '../../components/Common/PageTitle';
const MovieCard = lazy(() => import('./MovieCard'));

const MoviePage = () => {
  const location = useLocation();
  const { query } = useParams();
  const [movieDatas, setMovieDatas] = useState<IMovie>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const fetch = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log(query);
      const res = await getData(`/movie/${query}`, page);
      if (res === undefined || res === null) {
        navigate('/error');
        return;
      }
      setMovieDatas(res);
    } catch (e) {
      console.log(e, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [query, page, navigate]);
  useEffect(() => {
    fetch();
  }, [query, page, fetch]);

  const handleClick = (id: string, type: string) => {
    navigate(`/details/${type}/${id}`, { state: { type, id } });
  };

  //  JSX
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container sx={{ flexGrow: 1 }}>
      <PageTitle url={location.pathname} />
      <Grid container spacing={2}>
        {movieDatas.results &&
          movieDatas.results.map((movie) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              xl={3}
              key={movie.id}
              position="relative"
            >
              <Suspense fallback={<Loader />}>
                <MovieCard movie={movie} handleClick={handleClick} />
              </Suspense>
            </Grid>
          ))}
      </Grid>
      <PaginationComp setPage={setPage} />
    </Container>
  );
};

export default MoviePage;
