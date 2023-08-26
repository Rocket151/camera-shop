import { useState } from 'react';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ModalAddItemSuccess from '../../components/modal-add-item-success/modal-add-item-success';
import ModalAddItem from '../../components/modal-add-item/modal-add-item';
import ProductAndPaginationList from '../../components/product-and-pagination-list/product-and-pagination-list';
import Promo from '../../components/promo/promo';
import { ScreenNames } from '../../const';

export default function CatalogScreen() {
  const [isModalAddItem, setModalAddItem] = useState(false);
  const [isModalAddItemSuccess, setModalAddItemSuccess] = useState(false);

  return (
    <div className="wrapper">
      <Header />

      <main>
        <Promo />

        <div className="page-content">
          <BreadCrumbs />

          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <CatalogFilter />

                </div>
                <div className="catalog__content">
                  <CatalogSort />

                  <ProductAndPaginationList setModalAddItem={setModalAddItem}/>

                </div>
              </div>
            </div>
          </section>
        </div>
        <ModalAddItem currentScreenName={ScreenNames.Catalog} setModalAddItem={setModalAddItem} isModalAddItem={isModalAddItem} setModalAddItemSuccess={setModalAddItemSuccess} />

        <ModalAddItemSuccess setModalAddItemSuccess={setModalAddItemSuccess} isModalAddItemSuccess={isModalAddItemSuccess} />

      </main>
      <Footer />

    </div>
  );
}
