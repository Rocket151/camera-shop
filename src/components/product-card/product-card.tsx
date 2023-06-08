import { Link } from 'react-router-dom';

export default function ProductCard(): JSX.Element {
  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet="img/content/img5.webp, img/content/img5@2x.webp 2x" /><img src="img/content/img5.jpg" srcSet="img/content/img5@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат Instaprinter P2" />
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
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>849</p>
        </div>
        <p className="product-card__title">Instaprinter P2</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>8 430 ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link className="btn btn--transparent" to="#">Подробнее
        </Link>
      </div>
    </div>
  );
}
