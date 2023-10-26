import { Genre } from '../entities/Genre';
import { Movie } from '../entities/Movie';

export default function formatMovies(movies: Movie[], genres: Genre[]) {
  return movies.map(movie => ({
    ...movie,
    genres: genres.filter(genre => movie.genre_ids.includes(genre.id)),
  }));
}
