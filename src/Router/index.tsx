import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Layout } from '../components/Layout';
import { Details } from '../pages/Details';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:movieId" element={<Details />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
