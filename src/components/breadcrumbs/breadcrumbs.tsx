import { NavLink } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
const routes = [
  { path: '/product/:id', breadcrumb: DynamicUserBreadcrumb },
  { path: '/', breadcrumb: 'Каталог' },
];

function DynamicUserBreadcrumb(): JSX.Element {
  return (
    <svg width="5" height="8" aria-hidden="true">
      <use xlinkHref="#icon-arrow-mini"></use>
    </svg>
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
