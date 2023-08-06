import { Route, Routes } from 'react-router-dom';
import { AppRoute, SPINNER_COLOR } from '../../const';
import { useAppSelector } from '../../hooks';
import BasketScreen from '../../pages/basket-screen/basket-screen';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import ProductScreen from '../../pages/product-screen/product-screen';
import { getCamerasDataLoadingStatus } from '../../store/cameras-data/selectors';
import { getProductDataLoadingStatus } from '../../store/product-data/selectors';
import ClipLoader from 'react-spinners/ClipLoader';
import { CSSProperties } from 'react';

const override: CSSProperties = {
  display: 'block',
  margin: 'auto',
};

function App(): JSX.Element {
  const isCamerasDataLoading = useAppSelector(getCamerasDataLoadingStatus);
  const isProductDataLoading = useAppSelector(getProductDataLoadingStatus);

  if (isCamerasDataLoading || isProductDataLoading) {
    return (
      <ClipLoader
        color={SPINNER_COLOR}
        loading={isCamerasDataLoading || isProductDataLoading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
      />
    );
  }

  return (
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
  );
}

export default App;
