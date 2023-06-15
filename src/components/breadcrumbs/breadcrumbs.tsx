import { NavLink } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { useAppSelector } from '../../hooks';
import { getProductData } from '../../store/product-data/selectors';
const routes = [
  { path: '/product/:id', breadcrumb: ProductBreadcrumb},
  { path: '/', breadcrumb: CatalogBreadcrumb },
  { path: '/basket', breadcrumb: BasketBreadcrumb },
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
  return (
    <span>Каталог
      <svg width="5" height="8" aria-hidden="true">
        <use xlinkHref="#icon-arrow-mini"></use>
      </svg>
    </span>
  );
}

export default function BreadCrumbs(): JSX.Element {
  const breadcrumbs = useBreadcrumbs(routes);

  return(
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {breadcrumbs.map(({ match, breadcrumb }) => (
            match.pathname !== '/product' &&
            <li className="breadcrumbs__item" key={match.pathname}>
              <NavLink className="breadcrumbs__link" to={match.pathname}>
                {breadcrumb}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
