import { useCallback, useEffect, useState } from 'react';
import { Movie } from '../entities/Movie';
import { moviesService } from '../services/moviesService';
import { genresService } from '../services/genresService';
import { Genre } from '../entities/Genre';
import formatMovies from '../utils/formatMovies';

const APP_PAGINATION = 5;
const MOVIE_DB_API_PAGINATION = 20;

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    async function getGenres() {
      if (!genres.length) {
        const response = await genresService.findAll();

        setGenres(response?.genres);
      }
    }

    getGenres();
  }, []);

  useEffect(() => {
    async function getMovies() {
      const newApiPage = Math.trunc(currentPage / APP_PAGINATION + 1);

      const response = search
        ? await moviesService.search({ page: newApiPage, search })
        : await moviesService.findAll(newApiPage);

      // Calcula o índice inicial e final para exibir os 5 filmes da página atual.
      const apiPageIndex =
        (currentPage - 1) % (MOVIE_DB_API_PAGINATION / APP_PAGINATION);

      const startIndex = apiPageIndex * APP_PAGINATION;

      const endIndex = startIndex + APP_PAGINATION;

      // Define os filmes a serem exibidos na página atual.
      const slicedMovies = response.results.slice(startIndex, endIndex);

      const formattedMovies = formatMovies(slicedMovies, genres);

      setMovies(formattedMovies);
    }

    if (genres.length) getMovies();
  }, [currentPage, search, genres]);

  const handleSeaarchChange = useCallback((value: string) => {
    setSearch(value);

    setCurrentPage(1);
  }, []);

  function handleNextPage() {
    setCurrentPage(currentPage + 1);
  }

  function haandlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return { movies, handleSeaarchChange, handleNextPage, haandlePreviousPage };
}
