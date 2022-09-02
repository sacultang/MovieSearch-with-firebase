import React, { lazy, Suspense } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PageTitle from '../../components/common/PageTitle';
import Loader from '../../components/common/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { IMovieResult } from '../../types/movieType';
const MovieCard = lazy(() => import('../movies/MovieCard'));

interface IFBMovieType {
  id: string;
  movie: IMovieResult;
}

const Favorite = () => {
  // const [movieDatas, setMovieDatas] = useState([]);
  const location = useLocation();
  const params = useParams();

  const movieDatas = useSelector((state: RootState) => state.favorite.favorite);

  const handleClick = (id: string, type: string) => {
    console.log(id, type);
    if (type === 'favorite') return;
    // {
    //   movieDatas.forEach((item: any) =>
    //     item.first_air_date ? (path = 'tv') : (path = 'movie')
    //   );
    // }

    // navigate(`/details/${path}/${id}`, { state: { type, id } });
  };
  return (
    <Container sx={{ flexGrow: 1, minHeight: 800 }}>
      <PageTitle url={location.pathname} params={params} />
      <Grid container spacing={2}>
        {movieDatas.length > 0 &&
          movieDatas.map((movie: IFBMovieType) => (
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
                <MovieCard movie={movie.movie} handleClick={handleClick} />
              </Suspense>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Favorite;
