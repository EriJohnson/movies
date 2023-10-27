import { Link } from 'react-router-dom';

import './styles.css';

export function Header() {
  return (
    <header>
      <h1>
        <Link className="main-title" to="/?page=1">
          Movies
        </Link>
      </h1>
    </header>
  );
}
