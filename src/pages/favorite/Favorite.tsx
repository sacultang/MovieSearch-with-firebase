import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PageTitle from '../../components/Common/PageTitle';
import Loader from '../../components/Common/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
// import MovieCard from '../movies/MovieCard';
import { db } from '../../firebase';
import { onSnapshot, doc } from 'firebase/firestore';
const MovieCard = lazy(() => import('../movies/MovieCard'));
const Favorite = () => {
  // const [movieDatas, setMovieDatas] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const movieDatas = useSelector((state: RootState) => state.favorite.favorite);
  // useEffect(() => {
  //   const unsubs = onSnapshot(doc(db, 'users', user.email!), (doc) => {
  //     const newFaArr = doc.data()!.favorite;
  //     setMovieDatas(newFaArr);
  //   });
  //   return () => unsubs();
  // }, []);
  let path: string;
  console.log(movieDatas);
  const handleClick = (id: string, type: string) => {
    if (type === 'favorite') return;
    // {
    //   movieDatas.forEach((item: any) =>
    //     item.first_air_date ? (path = 'tv') : (path = 'movie')
    //   );
    // }
    console.log(path);
    // navigate(`/details/${path}/${id}`, { state: { type, id } });
  };
  return (
    <Container sx={{ flexGrow: 1 }}>
      <PageTitle url={location.pathname} />
      <Grid container spacing={2}>
        {movieDatas.length > 0 &&
          movieDatas.map((movie: any) => (
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
                <MovieCard movie={movie.movie} onClick={handleClick} />
              </Suspense>
            </Grid>
          ))}
      </Grid>
      {/* <PaginationComp setPage={setPage} /> */}
    </Container>
  );
};

export default Favorite;
