import { httpClient } from '../httpClient';

export async function getAll(page: number) {
  const { data } = await httpClient.get('popular', {
    params: {
      page,
    },
  });

  return data;
}
