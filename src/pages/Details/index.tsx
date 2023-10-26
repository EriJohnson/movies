import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GenreBadge } from '../../components/GenreBadge';
import { InformationsList } from '../../components/InformationsList';
import { InformationsListItem } from '../../components/InformationsList/InformationsListItem';
import { MovieDetails } from '../../entities/MovieDetails';
import { moviesService } from '../../services/moviesService';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import VoteAverageDisplay from '../../components/VoteAverageDisplay';

import './styles.css';

export function Details() {
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();

  const { movieId } = useParams();

  useEffect(() => {
    async function getMovieDetails() {
      const data = await moviesService.findOne(Number(movieId));

      setMovieDetails(data);
    }

    getMovieDetails();
  }, []);

  const postImage =
    'https://image.tmdb.org/t/p/w500/' + movieDetails?.poster_path;

  const balance =
    movieDetails?.revenue && movieDetails?.revenue - movieDetails?.budget;

  return (
    <>
      {movieDetails && (
        <div className="movie-details">
          <header className="movie-details__header">
            <h1 className="movie-details__title">{movieDetails?.title}</h1>
            <p className="movie-details__release-date">
              {formatDate(movieDetails?.release_date)}
            </p>
          </header>

          <div className="movie-details__body">
            <main className="movie-details__content">
              <section className="movie-details__overview">
                <h2 className="movie-details__title-section">Sinopse</h2>
                <hr className="movie-details__divider" />

                {movieDetails?.overview}
              </section>

              <section>
                <h2 className="movie-details__title-section">Informações</h2>
                <hr className="movie-details__divider" />

                <InformationsList>
                  <InformationsListItem
                    title="Situação"
                    value={movieDetails?.status}
                  />

                  <InformationsListItem
                    title="Idioma"
                    value={movieDetails?.original_language}
                  />

                  <InformationsListItem
                    title="Duração"
                    value={String(movieDetails?.runtime + 'min')}
                  />

                  {!!movieDetails.budget && (
                    <InformationsListItem
                      title="Orçamento"
                      value={formatCurrency(movieDetails?.budget)}
                    />
                  )}

                  {!!movieDetails?.revenue && (
                    <InformationsListItem
                      title="Receita"
                      value={formatCurrency(movieDetails?.revenue)}
                    />
                  )}

                  {!!balance && (
                    <InformationsListItem
                      title={balance > 0 ? 'Lucro' : 'Prejuízo'}
                      value={formatCurrency(balance)}
                    />
                  )}
                </InformationsList>
              </section>

              <footer className="movie-details__footer">
                <ul className="movie-details__genre-list">
                  {movieDetails?.genres.map(genre => (
                    <GenreBadge key={genre.id} genre={genre.name} />
                  ))}
                </ul>

                <VoteAverageDisplay value={movieDetails?.vote_average} />
              </footer>
            </main>

            <aside>
              <img src={postImage} />
            </aside>
          </div>
        </div>
      )}
    </>
  );
}
