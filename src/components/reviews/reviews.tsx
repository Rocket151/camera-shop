import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getReviewsData } from '../../store/reviews-data/selectors';

export default function Reviews(): JSX.Element {
  const reviewsData = useAppSelector(getReviewsData);
  const [reviews, setReviews] = useState(3);
  const slicedReviewsData = reviewsData.slice(0,reviews);

  const handleMoreButtonClick = () => {
    setReviews((prev) => prev + 3);
  };

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button">Оставить свой отзыв</button>
        </div>
        <ul className="review-block__list">
          {slicedReviewsData.map((reviewData) => (
            <li className="review-card" key={reviewData.id}>
              <div className="review-card__head">
                <p className="title title--h4">{reviewData.userName}</p>
                <time className="review-card__data" dateTime="2022-04-13">{reviewData.createAt}</time>
              </div>
              <div className="rate review-card__rate">
                <svg width="17" height="16" aria-hidden="true">
                  <use xlinkHref={`#icon-${reviewData.rating >= 1 ? 'full-' : ''}star`}></use>
                </svg>
                <svg width="17" height="16" aria-hidden="true">
                  <use xlinkHref={`#icon-${reviewData.rating >= 2 ? 'full-' : ''}star`}></use>
                </svg>
                <svg width="17" height="16" aria-hidden="true">
                  <use xlinkHref={`#icon-${reviewData.rating >= 3 ? 'full-' : ''}star`}></use>
                </svg>
                <svg width="17" height="16" aria-hidden="true">
                  <use xlinkHref={`#icon-${reviewData.rating >= 4 ? 'full-' : ''}star`}></use>
                </svg>
                <svg width="17" height="16" aria-hidden="true">
                  <use xlinkHref={`#icon-${reviewData.rating === 5 ? 'full-' : ''}star`}></use>
                </svg>
                <p className="visually-hidden">Оценка: {reviewData.rating}</p>
              </div>
              <ul className="review-card__list">
                <li className="item-list"><span className="item-list__title">Достоинства:</span>
                  <p className="item-list__text">{reviewData.advantage}</p>
                </li>
                <li className="item-list"><span className="item-list__title">Недостатки:</span>
                  <p className="item-list__text">{reviewData.disadvantage}</p>
                </li>
                <li className="item-list"><span className="item-list__title">Комментарий:</span>
                  <p className="item-list__text">{reviewData.review}</p>
                </li>
              </ul>
            </li>
          ))}
        </ul>
        <div className={`review-block__buttons ${reviews >= reviewsData.length ? 'is-hidden' : ''}`}>
          <button className="btn btn--purple" type="button" onClick={handleMoreButtonClick}>Показать больше отзывов
          </button>
        </div>
      </div>
    </section>
  );
}
