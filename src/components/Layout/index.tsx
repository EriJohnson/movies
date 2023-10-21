import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import './styles.css';

export function Layout() {
  return (
    <div className="container">
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
