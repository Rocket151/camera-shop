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
    <span className="breadcrumbs__link breadcrumbs__link--active">{productData?.name}</span>
  );
}

function BasketBreadcrumb(): JSX.Element {
  return (
    <span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
  );
}

function CatalogBreadcrumb(): JSX.Element {
  const location = useLocation();

  return (
    <NavLink className={`breadcrumbs__link ${location.pathname === AppRoute.Root ? 'breadcrumbs__link--active' : ''}`} to={AppRoute.Root}>Каталог
      <svg width="5" height="8" aria-hidden="true">
        <use xlinkHref="#icon-arrow-mini"></use>
      </svg>
    </NavLink>
  );
}

export default function BreadCrumbs(): JSX.Element {
  const breadcrumbs = useBreadcrumbs(routes);

  return(
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {breadcrumbs.map(({ match, breadcrumb }) => (
            <li className="breadcrumbs__item" key={match.pathname}>
              {breadcrumb}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
