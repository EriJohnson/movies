import { MovieCard } from '../../components/MovieCard';
import SearchInput from '../../components/SearchInput';
import { useMovies } from '../../hooks/useMovies';

import './styles.css';

export function Home() {
  const { movies, handleNextPage, handlePreviousPage, handleSearchChange } =
    useMovies();

  return (
    <div className="home">
      <SearchInput onChange={handleSearchChange} />

      {movies?.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}

      <div>
        <button onClick={handlePreviousPage}>Previous Page</button>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
    </div>
  );
}
