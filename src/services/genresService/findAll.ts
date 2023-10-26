import { Genre } from '../../entities/Genre';
import { httpClient } from '../httpClient';

interface GenreResponse {
  genres: Genre[];
}

export async function findAll() {
  const { data } = await httpClient.get<GenreResponse>('/genre/movie/list');

  return data;
}
