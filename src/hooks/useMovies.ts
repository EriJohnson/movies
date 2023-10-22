import { useCallback, useEffect, useState } from 'react';
import { Movie } from '../entities/Movie';
import { moviesService } from '../services/moviesService';

const MOVIES_PER_PAGE = 5;

interface ApiData {
  page: number;
  results: Movie[];
}

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const [apiData, setApiData] = useState<ApiData>({
    page: 0,
    results: [],
  });

  useEffect(() => {
    async function getMovies() {
      const newApiPage = apiData.page + 1;

      const response = search
        ? await moviesService.search({ page: newApiPage, search })
        : await moviesService.findAll(newApiPage);

      const newMovies = [...response.results, ...apiData.results];

      // Calcula o índice inicial e final para exibir os 5 filmes da página atual.
      const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;

      const endIndex = startIndex + MOVIES_PER_PAGE;

      // Define os filmes a serem exibidos na página atual.
      const slicedMovies = newMovies.slice(startIndex, endIndex);

      setMovies(slicedMovies);

      // Atualize os resultados da API e o número da página.
      setApiData({
        page: newApiPage,
        results: [...apiData.results, ...response.results],
      });
    }

    getMovies();
  }, [currentPage, search]);

  const handleSeaarchChange = useCallback((value: string) => {
    setSearch(value);

    setCurrentPage(1);

    setApiData({
      page: 0,
      results: [],
    });
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
