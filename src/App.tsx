import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './components/pages/Home';
import MainLayout from './components/Layouts/MainLayout';
import Loader from './components/UI/Loader/Loader.tsx';

import './scss/app.scss';

const Cart = lazy(() => import('./components/pages/Cart'));
const FullPizza = lazy(() => import('./components/pages/FullPizza'));
const NotFound = lazy(() => import('./components/pages/NotFound/NotFound.tsx'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="pizza/:id" element={<FullPizza />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
