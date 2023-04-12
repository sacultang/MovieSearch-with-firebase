import PageGridItem from '../../components/pageGrid/PageGridItem';
import MovieCard from '../movies/MovieCard';
import PageGridContainer from '../../components/pageGrid/PageGridContainer';
import { useOutletContext } from 'react-router-dom';
import { IMovie } from '../../types/movieType';
import useHandleNavigate from '../hooks/useHandleNavigate';

type OutletChildProps = {
  searchResults: IMovie;
};
const SearchResults = () => {
  const { searchResults } = useOutletContext<OutletChildProps>();
  const handleClickNavigate = useHandleNavigate();

  return (
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
  );
};

export default SearchResults;
