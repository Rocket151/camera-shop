import { NavLink, useLocation } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getProductData } from '../../store/product-data/selectors';

const routes = [
  { path: '/product/', breadcrumb: null},
  { path: '/product/:id', breadcrumb: ProductBreadcrumb},
  { path: '/', breadcrumb: CatalogBreadcrumb},
  { path: '/basket', breadcrumb: BasketBreadcrumb, },
];

function ProductBreadcrumb(): JSX.Element {
  const productData = useAppSelector(getProductData);

  return (
    <li className="breadcrumbs__item" >
      <span className="breadcrumbs__link breadcrumbs__link--active">{productData?.name}</span>
    </li>
  );
}

function BasketBreadcrumb(): JSX.Element {
  return (
    <li className="breadcrumbs__item" >
      <span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
    </li>
  );
}

function CatalogBreadcrumb(): JSX.Element {
  const location = useLocation();

  return (
    <>
      <li className="breadcrumbs__item" >
        <NavLink className='breadcrumbs__link' to={AppRoute.Root}>Главная
          <svg width="5" height="8" aria-hidden="true">
            <use xlinkHref="#icon-arrow-mini"></use>
          </svg>
        </NavLink>
      </li>
      <li className="breadcrumbs__item" >
        <NavLink className={`breadcrumbs__link ${location.pathname === AppRoute.Root ? 'breadcrumbs__link--active' : ''}`} to={AppRoute.Root}>Каталог
          {
            !(location.pathname === AppRoute.Root) &&
            <svg width="5" height="8" aria-hidden="true">
              <use xlinkHref="#icon-arrow-mini"></use>
            </svg>
          }
        </NavLink>
      </li>
    </>
  );
}

export default function BreadCrumbs(): JSX.Element {
  const breadcrumbs = useBreadcrumbs(routes);

  return(
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {breadcrumbs.map(({ breadcrumb }) => breadcrumb)}
        </ul>
      </div>
    </div>
  );
}
