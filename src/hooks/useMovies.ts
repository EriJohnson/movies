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

  const pageQuery = searchParams.get('page') || '';
  const searchQuery = searchParams.get('search') || '';

  const [currentPage, setCurrentPage] = useState(pageQuery || 1);

  const [movies, setMovies] = useState<Movie[]>();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [pageCount, setPageCount] = useState(1);

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
      setPageCount(Math.ceil(response.total_results / APP_PAGINATION));
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

      return;
    }

    setSearchParams({
      search: searchQuery || '',
      page: String(pageQuery || 1),
    });
  }, []);

  function handlePageChange(selectedItem: { selected: number }) {
    const newPage = selectedItem.selected + 1;

    if (newPage >= 1) {
      setCurrentPage(newPage);

      if (searchQuery) {
        return setSearchParams({ search: searchQuery, page: String(newPage) });
      }

      return setSearchParams({ page: String(newPage) });
    }
  }

  return {
    movies,
    searchQuery,
    pageQuery,
    pageCount,
    handleSearchChange,
    handlePageChange,
  };
}
