import { MovieCard } from '../../components/MovieCard';
import { useMovies } from '../../hooks/useMovies';
import './styles.css';

export function Home() {
  const { movies, nextPage, previousPage } = useMovies();

  return (
    <div className="home">
      <div>
        <button onClick={previousPage}>Previous Page</button>
        <button onClick={nextPage}>Next Page</button>
      </div>

      {movies?.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}

      <div>
        <button onClick={previousPage}>Previous Page</button>
        <button onClick={nextPage}>Next Page</button>
      </div>
    </div>
  );
}
