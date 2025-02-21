import Container from 'components/Container';
import { ProgressSpinner } from 'primereact/progressspinner';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

const Products = lazy(() =>
  import('pages/Home'),
);
const CardProduct = lazy(() =>
  import('pages/CardProduct'),
);
const NotFound = lazy(() =>
  import('pages/NotFound'),
);

function App() {
  return (
    <Container>
      <Suspense fallback={<ProgressSpinner />}>
        <Routes>
          <Route index element={<Products />} />
          <Route path='/:id' element={<CardProduct />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </Container>
  );
}

export default App;
