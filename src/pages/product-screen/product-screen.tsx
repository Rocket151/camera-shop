import { useState } from 'react';
import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ModalAddItem from '../../components/modal-add-item/modal-add-item';
import ModalAddReview from '../../components/modal-add-review/modal-add-review';
import ModalAddReviewSuccess from '../../components/modal-add-review-success/modal-add-review-success';
import ProductTabs from '../../components/product-tabs/product-tabs';
import Reviews from '../../components/reviews/reviews';
import SimilarCamerasList from '../../components/similar-camera-list/similar-camera-list';
import { ScreenNames } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCameraData } from '../../store/cameras-data/cameras-data';
import { getProductData } from '../../store/product-data/selectors';
import NotFoundScreen from '../not-found-screen/not-found-screen';

export default function ProductScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const productData = useAppSelector(getProductData);
  const [isModalAddItem, setModalAddItem] = useState(false);
  const [isModalAddReview, setModalAddReview] = useState(false);
  const [isModalAddReviewSuccess, setModalAddReviewSuccess] = useState(false);

  const handleAddToBasketClick = () => {
    dispatch(selectCameraData(productData));
    setModalAddItem(true);
    document.body.style.overflowY = 'hidden';
  };

  if (productData) {
    const {name, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, reviewCount} = productData;
    return (
      <div className="wrapper">

        <Header />
        <main>
          <div className="page-content">
            <BreadCrumbs />
            <div className="page-content__section">
              <section className="product">
                <div className="container">
                  <div className="product__img">
                    <picture>
                      <source type="image/webp" srcSet={`../${previewImgWebp}, ../${previewImgWebp2x}`} />
                      <img src={`../${previewImg}`} srcSet={`../${previewImg2x}`} width="560" height="480" alt={name} />
                    </picture>
                  </div>
                  <div className="product__content">
                    <h1 className="title title--h3">{name}</h1>
                    <div className="rate product__rate">
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <p className="visually-hidden">Рейтинг: 4</p>
                      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
                    </div>
                    <p className="product__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
                    <button className="btn btn--purple" type="button" onClick={handleAddToBasketClick}>
                      <svg width="24" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-add-basket"></use>
                      </svg>Добавить в корзину
                    </button>

                    <ProductTabs />
                  </div>
                </div>
              </section>
            </div>
            <div className="page-content__section">

              <SimilarCamerasList setModalAddItem={setModalAddItem} />
            </div>
            <div className="page-content__section">
              <Reviews setModalAddReview={setModalAddReview}/>

            </div>
          </div>
          <ModalAddReview setModalAddReview={setModalAddReview} isModalAddReview={isModalAddReview} productData={productData} setModalAddReviewSuccess={setModalAddReviewSuccess}/>

          <ModalAddItem setModalAddItem={setModalAddItem} currentScreenName={ScreenNames.Product} isModalAddItem={isModalAddItem} />

          <ModalAddReviewSuccess setModalAddReviewSuccess={setModalAddReviewSuccess} isModalAddReviewSuccess={isModalAddReviewSuccess} />

        </main>
        <a className="up-btn" href="#header">
          <svg width="12" height="18" aria-hidden="true">
            <use xlinkHref="#icon-arrow2"></use>
          </svg>
        </a>
        <Footer />
      </div>
    );
  }
  return <NotFoundScreen />;
}
