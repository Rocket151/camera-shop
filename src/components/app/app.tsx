import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import BasketScreen from '../../pages/basket-screen/basket-screen';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import ProductScreen from '../../pages/product-screen/product-screen';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path = {AppRoute.Root}
          element = {<CatalogScreen />}
        />

        <Route path = {AppRoute.Product}>
          <Route path = ':id' element = {<ProductScreen />} />
        </Route>

        <Route
          path = {AppRoute.Basket}
          element = {<BasketScreen />}
        />

        <Route
          path='*'
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
