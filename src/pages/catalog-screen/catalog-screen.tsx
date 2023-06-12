import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ProductAndPaginationList from '../../components/product-and-pagination-list/product-and-pagination-list';
import Promo from '../../components/promo/promo';

export default function CatalogScreen() {
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
                  <ProductAndPaginationList />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
