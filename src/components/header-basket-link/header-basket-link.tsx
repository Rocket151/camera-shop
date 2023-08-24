import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getBasketCamerasData } from '../../store/basket-data/selectors';
import { useAppSelector } from '../../hooks';

export default function HeaderBasketLink(): JSX.Element {
  const basketCamerasData = useAppSelector(getBasketCamerasData);
  const basketItemsAmount = basketCamerasData.reduce((acc, val) => {
    acc += val.basketItemCount;

    return acc;
  }, 0);

  return (
    <Link className="header__basket-link" to={AppRoute.Basket}>
      <svg width="16" height="16" aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg>
      {
        basketItemsAmount !== 0 && <span className="header__basket-count">{basketItemsAmount}</span>
      }
    </Link>
  );
}
