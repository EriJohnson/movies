import { Movie } from '../../entities/Movie';
import { httpClient } from '../httpClient';

interface MoviesResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: Movie[];
}

export async function findAll(page: number) {
  const { data } = await httpClient.get<MoviesResponse>('popular', {
    params: {
      page,
    },
  });

  return data;
}
