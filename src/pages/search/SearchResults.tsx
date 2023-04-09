import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import GridItemProvider from '../../components/common/GridItemProvider';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { HandleClickNaviType } from '../../types/handleClickNaviType';
import MovieCard from '../movies/MovieCard';
const SearchResults = () => {
  const movieData = useSelector((state: RootState) => state.movie.movie);
  const navigate = useNavigate();

  const handleClickNavigate: HandleClickNaviType = (id, type) => {
    navigate(`/details/${type}/${id}`, { state: { type, id } });
  };
  return (
    <Grid container mt={3}>
      {movieData.results &&
        movieData.results.map((movie) => (
          <GridItemProvider key={movie.id}>
            <MovieCard
              movie={movie}
              handleClickNavigate={handleClickNavigate}
            />
          </GridItemProvider>
        ))}
    </Grid>
  );
};

export default SearchResults;
