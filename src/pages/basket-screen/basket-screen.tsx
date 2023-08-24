import { useState } from 'react';
import BasketListItem from '../../components/basket-list-item/basket-list-item';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ModalRemoveBasketItem from '../../components/modal-remove-basket-item/modal-remove-basket-item';
import { useAppSelector } from '../../hooks';
import { getBasketCamerasData } from '../../store/basket-data/selectors';

export default function BasketScreen(): JSX.Element {
  const basketCamerasData = useAppSelector(getBasketCamerasData);
  const [isModalRemoveBasketItem, setModalRemoveBasketItem] = useState(false);
  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <BreadCrumbs />
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <ul className="basket__list">
                {
                  basketCamerasData.length ?
                    basketCamerasData.map((basketCamera) => <BasketListItem basketListItem={basketCamera} key={basketCamera.id} setModalRemoveBasketItem={setModalRemoveBasketItem}/>) :
                    'В данный момент корзина пуста'
                }
              </ul>
              <div className="basket__summary">
                <div className="basket__promo">
                  <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                  <div className="basket-form">
                    <form action="#">
                      <div className="custom-input">
                        <label><span className="custom-input__label">Промокод</span>
                          <input type="text" name="promo" placeholder="Введите промокод" />
                        </label>
                        <p className="custom-input__error">Промокод неверный</p>
                        <p className="custom-input__success">Промокод принят!</p>
                      </div>
                      <button className="btn" type="submit">Применить
                      </button>
                    </form>
                  </div>
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">0 ₽</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">0 ₽</span></p>
                  <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">0 ₽</span></p>
                  <button className="btn btn--purple" type="submit">Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <ModalRemoveBasketItem isModalRemoveBasketItem={isModalRemoveBasketItem} setModalRemoveBasketItem={setModalRemoveBasketItem}/>
      <Footer />
    </div>
  );
}
