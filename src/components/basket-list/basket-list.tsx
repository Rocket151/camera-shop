import { useAppSelector } from '../../hooks';
import { getBasketCamerasData } from '../../store/basket-data/selectors';
import BasketListItem from '../basket-list-item/basket-list-item';

export default function BasketList (): JSX.Element {
  const basketCamerasData = useAppSelector(getBasketCamerasData);
  return (
    <>
      {
        basketCamerasData.map((basketCamera) => <BasketListItem basketListItem={basketCamera} key={basketCamera.id}/>)
      }
    </>
  );
}
