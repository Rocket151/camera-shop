import { useState } from 'react';
import BasketListItem from '../../components/basket-list-item/basket-list-item';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ModalRemoveBasketItem from '../../components/modal-remove-basket-item/modal-remove-basket-item';
import ModalSetOrderSuccess from '../../components/modal-set-order-success/modal-set-order-success';
import SummaryField from '../../components/summary-field/summary-field';
import { useAppSelector } from '../../hooks';
import { getBasketCamerasData } from '../../store/basket-data/selectors';

export default function BasketScreen(): JSX.Element {
  const basketCamerasData = useAppSelector(getBasketCamerasData);
  const [isModalRemoveBasketItem, setModalRemoveBasketItem] = useState(false);
  const [isModalSetOrderSuccess, setModalSetOrderSuccess] = useState(false);
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
              <SummaryField />

            </div>
          </section>
        </div>
      </main>
      <ModalRemoveBasketItem isModalRemoveBasketItem={isModalRemoveBasketItem} setModalRemoveBasketItem={setModalRemoveBasketItem}/>
      <ModalSetOrderSuccess isModalSetOrderSuccess={isModalSetOrderSuccess} setModalSetOrderSuccess={setModalSetOrderSuccess} />
      <Footer />
    </div>
  );
}
