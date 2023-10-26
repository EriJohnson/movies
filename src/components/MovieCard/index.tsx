import { Link } from 'react-router-dom';
import { Movie } from '../../entities/Movie';
import { formatDate } from '../../utils/formatDate';
import VoteAverageDisplay from '../VoteAverageDisplay';
import './styles.css';
import GenreList from '../GenreList';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const postImage = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;

  return (
    <article className="movie-card">
      <Link to={String(movie.id)} className="movie-card__post">
        <img src={postImage} />
      </Link>

      <div className="movie-card__content">
        <header className="movie-card__header">
          <div className="movie-card__header__inner">
            <VoteAverageDisplay value={movie.vote_average} />

            <div>
              <h3 className="movie-card__title">{movie?.title}</h3>
              <p className="movie-date">{formatDate(movie.release_date)}</p>
            </div>
          </div>
        </header>

        <section className="movie-card__body">
          <p className="movie-card__overview">
            {movie.overview || 'Sem sinopse'}
          </p>
        </section>

        <section className="movie-card__footer">
          <GenreList genres={movie?.genres} />
        </section>
      </div>
    </article>
  );
}
