import { useCallback, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Genre } from '../entities/Genre';
import { Movie } from '../entities/Movie';
import { genresService } from '../services/genresService';
import { moviesService } from '../services/moviesService';
import formatMovies from '../utils/formatMovies';

const APP_PAGINATION = 5;
const MOVIE_DB_API_PAGINATION = 20;

export function useMovies() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(location.search);

  const pageQuery = Number(searchParams.get('page') || 1);
  const searchQuery = searchParams.get('search');

  const [currentPage, setCurrentPage] = useState(pageQuery);

  const [movies, setMovies] = useState<Movie[]>();
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    async function fetchGenres() {
      if (!genres.length) {
        const response = await genresService.findAll();

        setGenres(response?.genres);
      }
    }

    fetchGenres();
  }, []);

  useEffect(() => {
    async function fetchMovies() {
      const currentPage = Number(pageQuery);

      const newApiPage = Math.trunc(currentPage / APP_PAGINATION + 1);

      const search = searchParams.get('search');
      const page = newApiPage;

      const response = search
        ? await moviesService.search({ search, page })
        : await moviesService.findAll(page);

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

    if (genres.length) {
      fetchMovies();
    }
  }, [pageQuery, searchQuery, genres.length]);

  const handleSearchChange = useCallback((value: string) => {
    if (value) {
      setSearchParams({
        search: value,
        page: String(1),
      });
    }
  }, []);

  function handlePageChange(newPage: number) {
    if (newPage >= 1) {
      setCurrentPage(newPage);

      if (searchQuery) {
        return setSearchParams({ search: searchQuery, page: String(newPage) });
      }

      return setSearchParams({ page: String(newPage) });
    }
  }

  function handleNextPage() {
    handlePageChange(currentPage + 1);
  }

  function handlePreviousPage() {
    handlePageChange(currentPage - 1);
  }

  return {
    movies,
    searchQuery,
    handleSearchChange,
    handleNextPage,
    handlePreviousPage,
  };
}
