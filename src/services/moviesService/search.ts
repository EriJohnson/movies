import { Movie } from '../../entities/Movie';
import { httpClient } from '../httpClient';

interface MoviesResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: Movie[];
}

interface SearchServiceParams {
  page: number;
  search?: string | null;
}

export async function search({ page, search }: SearchServiceParams) {
  const { data } = await httpClient.get<MoviesResponse>('/search/movie', {
    params: {
      query: search,
      page,
    },
  });

  return data;
}
