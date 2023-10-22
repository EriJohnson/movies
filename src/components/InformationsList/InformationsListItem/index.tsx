import './styles.css';

interface InformationsListItemProps {
  title: string;
  value: string;
}

export function InformationsListItem({
  title,
  value,
}: InformationsListItemProps) {
  console.log('value', value);

  if (!value) return null;

  return (
    <li>
      <p className="movie-details__informations-title">{title}</p>

      <p className="movie-details__information-item">{value}</p>
    </li>
  );
}
