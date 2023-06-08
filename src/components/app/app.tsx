import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import BasketScreen from '../../pages/basket-screen/basket-screen';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import ProductScreen from '../../pages/product-screen/product-screen';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path = {AppRoute.Root}
          element = {<CatalogScreen />}
        />

        <Route
          path = {AppRoute.Product}
          element = {<ProductScreen />}
        />

        <Route
          path = {AppRoute.Basket}
          element = {<BasketScreen />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
