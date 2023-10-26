import { Genre } from '../../entities/Genre';
import { GenreBadge } from '../GenreBadge';

import './styles.css';

interface GenreListProps {
  genres: Genre[];
}

export default function GenreList({ genres }: GenreListProps) {
  return (
    <ul className="genre-list">
      {genres.map(genre => (
        <GenreBadge key={genre.id} genre={genre.name} />
      ))}
    </ul>
  );
}
