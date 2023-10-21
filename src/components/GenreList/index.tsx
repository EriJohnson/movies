import { GenreBadge } from '../GenreBadge';

import './styles.css';

export default function GenreList() {
  return (
    <ul className="genre-list">
      <GenreBadge genre="Ação" />
    </ul>
  );
}
