import { MovieDetails } from '../../entities/MovieDetails';
import { httpClient } from '../httpClient';

export async function findOne(movieId: number) {
  const { data } = await httpClient.get<MovieDetails>(`/movie/${movieId}`);

  return data;
}
