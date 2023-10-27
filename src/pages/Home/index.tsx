import { MovieCard } from '../../components/MovieCard';
import { Paginate } from '../../components/Paginate';
import SearchInput from '../../components/SearchInput';
import { useMovies } from '../../hooks/useMovies';

import './styles.css';

export function Home() {
  const { movies, pageCount, pageQuery, handleSearchChange, handlePageChange } =
    useMovies();

  return (
    <div className="home">
      <SearchInput onChange={handleSearchChange} />

      {movies?.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}

      <footer>
        <Paginate
          initialPage={Number(pageQuery) - 1}
          pageCount={pageCount}
          onPageChange={handlePageChange}
        />
      </footer>
    </div>
  );
}
