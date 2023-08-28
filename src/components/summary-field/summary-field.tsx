import { FormEvent, useEffect, useState } from 'react';
import { CouponStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkCouponAction, setOrderAction } from '../../store/api-actions';
import { resetCouponDiscount } from '../../store/basket-data/basket-data';
import { getBasketCamerasData, getCouponDiscount, getOrderStatus } from '../../store/basket-data/selectors';

export default function SummaryField(): JSX.Element {
  const couponDiscount = useAppSelector(getCouponDiscount);
  const basketCamerasData = useAppSelector(getBasketCamerasData);
  const isOrderHasPlaced = useAppSelector(getOrderStatus);
  const dispatch = useAppDispatch();
  const [couponData, setCouponData] = useState('');
  const basketSummaryValue = basketCamerasData.reduce((acc, val) => {
    acc += val.basketItemCount * val.price;

    return acc;
  }, 0);

  const getBasketSummaryValueDiscount = () => {
    if((couponDiscount !== CouponStatus.noDiscount) && (couponDiscount !== CouponStatus.InvalidCoupon)) {
      return basketSummaryValue * Number(couponDiscount) / 100;
    }
    return 0;
  };

  const basketSummaryValueDiscount = getBasketSummaryValueDiscount();

  const getCouponClass = () => {
    if(couponDiscount === CouponStatus.noDiscount) {
      return '';
    }

    if(couponDiscount === CouponStatus.InvalidCoupon) {
      return 'is-invalid';
    }

    return 'is-valid';
  };

  const handleOnSubmitClick = (evt: FormEvent<HTMLFormElement>) => {
    evt?.preventDefault();
    dispatch(checkCouponAction({
      formData:
      {
        coupon: couponData,

      },
    }));
  };

  const handleCouponInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const target = evt.target;
    setCouponData(target.value.replace(/[\s]/g, ''));

    if(couponData === '') {
      dispatch(resetCouponDiscount());
    }
  };

  const handleSetOrderClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(setOrderAction({
      camerasIds: basketCamerasData.map((basketCameraData) => basketCameraData.id),
      coupon: 'camera-333',
    }));
  };

  useEffect(() => {
    if(isOrderHasPlaced) {
      setCouponData('');
      dispatch(resetCouponDiscount());
    }
  }, [setCouponData, isOrderHasPlaced, dispatch]);

  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
        <div className="basket-form">
          <form action="#" onSubmit={handleOnSubmitClick}>
            <div className={`custom-input ${couponData ? getCouponClass() : ''}`}>
              <label><span className="custom-input__label">Промокод</span>
                <input type="text" name="promo" value={couponData} placeholder="Введите промокод" onChange={handleCouponInputChange}/>
              </label>
              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button className="btn" type="submit" disabled={!basketCamerasData.length}>Применить
            </button>
          </form>
        </div>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{basketSummaryValue} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className={`basket__summary-value ${basketSummaryValueDiscount > 0 ? 'basket__summary-value--bonus' : ''}`}>{basketSummaryValueDiscount} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{basketSummaryValue - basketSummaryValueDiscount} ₽</span></p>
        <button className="btn btn--purple" type="submit" onClick={handleSetOrderClick} disabled={!basketCamerasData.length}>Оформить заказ</button>
      </div>
    </div>
  );
}
