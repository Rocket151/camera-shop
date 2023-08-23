import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { changeBasketItemCount, deleteBasketItem } from '../../store/basket-data/basket-data';
import { BasketCamerasData } from '../../types/basket-cameras-data';
import { humanizePrice } from '../../utils';

type BasketListItemProps = {
  basketListItem: BasketCamerasData;
}

export default function BasketListItem ({basketListItem}: BasketListItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {name, type, level, price, basketItemCount, vendorCode,
    previewImg, previewImgWebp, previewImgWebp2x, previewImg2x, id} = basketListItem;

  const [quantity, setQuantity] = useState(`${basketItemCount}`);

  const handleCounterFocusOut = (evt : React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const inputValue = evt.target.value;

    dispatch(changeBasketItemCount({
      ...basketListItem,
      basketItemCount: Number(inputValue),
    }));
  };

  const handleIncreaseQuantityBtnClick = () => {
    if(Number(quantity) > 98) {
      setQuantity('1');
      return;
    }

    setQuantity((prevValue) => (Number(prevValue) + 1).toString());

    dispatch(changeBasketItemCount({
      ...basketListItem,
      basketItemCount: Number(quantity) + 1,
    }));
  };

  const handleDecreaseQuantityBtnClick = () => {
    if(Number(quantity) < 2) {
      setQuantity('1');
      return;
    }
    setQuantity((prevValue) => (Number(prevValue) - 1).toString());
    dispatch(changeBasketItemCount({
      ...basketListItem,
      basketItemCount: Number(quantity) - 1,
    }));
  };

  const handleCounterChange = (evt : React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();

    const inputValue = evt.target.value;

    if(inputValue.length > 2 || inputValue < '1') {
      setQuantity('1');
      return;
    }

    setQuantity(inputValue.replace(/[^0-9]/g, ''));
  };

  const deleteItemFromBasket = () => {
    dispatch(deleteBasketItem(id));
  };

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`../${previewImgWebp}, ../${previewImgWebp2x}`} />
          <img src={`../${previewImg}`} srcSet={`../${previewImg2x}`} width="560" height="480" alt={name} />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{type}</li>
          <li className="basket-item__list-item">{level}</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{humanizePrice(price)} ₽</p>
      <div className="quantity">
        <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара" onClick={handleDecreaseQuantityBtnClick}>
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input type="number" id="counter1" value={quantity} aria-label="количество товара" onChange={handleCounterChange} onBlur={handleCounterFocusOut}/>
        <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара" onClick={handleIncreaseQuantityBtnClick}>
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{humanizePrice(basketItemCount * price)} ₽</div>
      <button className="cross-btn" type="button" aria-label="Удалить товар" onClick={deleteItemFromBasket}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}
