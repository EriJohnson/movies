import { useEffect, useState } from 'react';
import { Movie } from '../entities/Movie';
import { moviesService } from '../services/moviesService';

const API_PER_PAGE = 20;
const APPLICATION_PER_PAGE = 5;

interface ApiData {
  page: number;
  results: Movie[];
}

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>();
  const [currentApplicationPage, setCurrentPage] = useState(1);

  const [apiData, setApiData] = useState<ApiData>({
    page: 0,
    results: [],
  });

  useEffect(() => {
    async function getMovies() {
      // Se a página atual excede os resultados disponíveis, faça uma nova chamada à API.
      if (
        currentApplicationPage * APPLICATION_PER_PAGE >
        apiData.page * API_PER_PAGE
      ) {
        const newApiPage = apiData.page + 1;
        const response = await moviesService.getAll(newApiPage);

        // Atualize os resultados da API e o número da página.
        setApiData({
          page: newApiPage,
          results: [...apiData.results, ...response.results],
        });
      }

      // Calcula o índice inicial e final para exibir os 5 filmes da página atual.
      const startIndex = (currentApplicationPage - 1) * APPLICATION_PER_PAGE;
      const endIndex = startIndex + APPLICATION_PER_PAGE;

      // Define os filmes a serem exibidos na página atual.
      const slicedMovies = apiData.results.slice(startIndex, endIndex);

      setMovies(slicedMovies);
    }

    getMovies();
  }, [currentApplicationPage, apiData]);

  function nextPage() {
    setCurrentPage(currentApplicationPage + 1);
  }

  function previousPage() {
    if (currentApplicationPage > 1) {
      setCurrentPage(currentApplicationPage - 1);
    }
  }

  return { movies, nextPage, previousPage };
}
