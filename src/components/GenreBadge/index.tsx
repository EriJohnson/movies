import './styles.css';

interface GenreBadgeProps {
  genre: string;
}

export function GenreBadge({ genre }: GenreBadgeProps) {
  return <li className="genre-badge">{genre}</li>;
}
