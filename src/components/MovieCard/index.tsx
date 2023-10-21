import GenreList from '../GenreList';
import PercentageDisplay from '../PercentageDisplay';
import './styles.css';

export function MovieCard() {
  return (
    <article className="movie-card">
      <img
        className="movie-card__thumbnail"
        src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/fQea7XBIBXggaR8sDp0XjJ92q5g.jpg"
      />

      <div className="movie-card__content">
        <header className="movie-card__header">
          <div className="movie-card__header__inner">
            <PercentageDisplay value="75%" />

            <div>
              <h3 className="movie-card__title">Thor: Ragnarok</h3>
              <p className="movie-date">25/10/2017</p>
            </div>
          </div>
        </header>

        <section className="movie-card__body">
          <p className="movie-card__description">
            Thor está preso do outro lado do universo. Ele precisa correr contra
            o tempo para voltar a Asgard e parar Ragnarok, a destruição de seu
            mundo, que está nas mãos da poderosa e implacável vilã Hela.
          </p>
        </section>

        <section className="movie-card__footer">
          <GenreList />
        </section>
      </div>
    </article>
  );
}
