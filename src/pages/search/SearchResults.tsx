import PageGridItem from '../../components/pageGrid/PageGridItem';
import { useNavigate } from 'react-router-dom';
import { HandleClickNaviType } from '../../types/handleClickNaviType';
import MovieCard from '../movies/MovieCard';
import PageGridContainer from '../../components/pageGrid/PageGridContainer';
import Container from '@mui/material/Container';
import { useOutletContext } from 'react-router-dom';
import { IMovie } from '../../types/movieType';

type OutletChildProps = {
  searchResults: IMovie;
};
const SearchResults = () => {
  const { searchResults } = useOutletContext<OutletChildProps>();
  const navigate = useNavigate();
  const handleClickNavigate: HandleClickNaviType = (id, type) => {
    navigate(`/details/${type}/${id}`, { state: { type, id } });
  };
  return (
    <Container sx={{ flexGrow: 1 }}>
      <PageGridContainer>
        {searchResults.results &&
          searchResults.results.map((movie) => (
            <PageGridItem key={movie.id}>
              <MovieCard
                movie={movie}
                handleClickNavigate={handleClickNavigate}
              />
            </PageGridItem>
          ))}
      </PageGridContainer>
    </Container>
  );
};

export default SearchResults;
