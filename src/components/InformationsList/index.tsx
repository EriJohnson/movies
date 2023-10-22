import { ReactNode } from 'react';

import './styles.css';

export function InformationsList({ children }: { children: ReactNode }) {
  return <ul className="movie-details__informations-list">{children}</ul>;
}
