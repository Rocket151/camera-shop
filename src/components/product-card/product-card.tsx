import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { fetchProductDataAction, fetchSimilarCamerasDataAction } from '../../store/api-actions';
import { CamerasData } from '../../types/cameras-data';
import Modal from '../modal/modal';

type ProductCardProps = {
  cameraData: CamerasData;
  carouselClass?: string;
}

export default function ProductCard({cameraData, carouselClass}: ProductCardProps): JSX.Element {
  const [isModal, setModel] = useState(false);
  const dispatch = useAppDispatch();
  const {id, name, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, reviewCount, vendorCode, category, level} = cameraData;

  const handleModalClose = () => {
    setModel(false);
  };
  const handleModalOpen = () => {
    setModel(true);
  };

  return (
    <>
      <div className={`product-card ${carouselClass ? carouselClass : ''}`}>
        <div className="product-card__img">
          <picture>
            <source type="image/webp" srcSet={`${carouselClass ? `../${previewImgWebp}` : previewImgWebp}, ${carouselClass ? `../${previewImgWebp2x}` : previewImgWebp2x}`} />
            <img src={carouselClass ? `../${previewImg}` : previewImg} srcSet={carouselClass ? `../${previewImg2x}` : previewImg2x} width="280" height="240" alt={name} />
          </picture>
        </div>
        <div className="product-card__info">
          <div className="rate product-card__rate">
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
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <p className="visually-hidden">Рейтинг: 5</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
          </div>
          <p className="product-card__title">{name}</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽
          </p>
        </div>
        <div className="product-card__buttons">
          <button className="btn btn--purple product-card__btn" type="button" onClick={handleModalOpen}>Купить
          </button>
          <Link className="btn btn--transparent" onClick={() => {
            dispatch(fetchProductDataAction(id.toString()));
            dispatch(fetchSimilarCamerasDataAction(id.toString()));
          }} to={AppRoute.Product + id.toString()}
          >Подробнее
          </Link>
        </div>
      </div>
      {
        isModal &&
        <Modal onClose={handleModalClose}>
          <div className="modal is-active">
            <div className="modal__wrapper">
              <div className="modal__overlay"></div>
              <div className="modal__content">
                <p className="title title--h4">Добавить товар в корзину</p>
                <div className="basket-item basket-item--short">
                  <div className="basket-item__img">
                    <picture>
                      <source type="image/webp" srcSet={`${carouselClass ? `../${previewImgWebp}` : previewImgWebp}, ${carouselClass ? `../${previewImgWebp2x}` : previewImgWebp2x}`} />
                      <img src={carouselClass ? `../${previewImg}` : previewImg} srcSet={carouselClass ? `../${previewImg2x}` : previewImg2x} width="280" height="240" alt={name} />
                    </picture>
                  </div>
                  <div className="basket-item__description">
                    <p className="basket-item__title">{name}</p>
                    <ul className="basket-item__list">
                      <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
                      </li>
                      <li className="basket-item__list-item">{category}</li>
                      <li className="basket-item__list-item">{level} уровень</li>
                    </ul>
                    <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
                  </div>
                </div>
                <div className="modal__buttons">
                  <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>
                </div>
                <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleModalClose}>
                  <svg width="10" height="10" aria-hidden="true">
                    <use xlinkHref="#icon-close"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      }
    </>
  );
}
