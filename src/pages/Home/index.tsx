import { MovieCard } from '../../components/MovieCard';
import SearchInput from '../../components/SearchInput';
import { useMovies } from '../../hooks/useMovies';

import './styles.css';

export function Home() {
  const { movies, handleNextPage, haandlePreviousPage, handleSeaarchChange } =
    useMovies();

  return (
    <div className="home">
      <SearchInput onChange={handleSeaarchChange} />

      {movies?.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}

      <div>
        <button onClick={haandlePreviousPage}>Previous Page</button>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
    </div>
  );
}
