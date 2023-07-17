import { useAppSelector } from '../../hooks';
import { getAllReviewsData } from '../../store/reviews-data/selectors';
import { calculateRating } from '../../utils';

type ProductCardRatingProps = {
  reviewsCount: number;
  productId: number;
}


export default function ProductCardRating({reviewsCount, productId}: ProductCardRatingProps): JSX.Element {
  const reviews = useAppSelector(getAllReviewsData);
  const rating = calculateRating(reviews, productId);

  return (
    <div className="rate product-card__rate">
      <svg width="17" height="16" aria-hidden="true">
        <use xlinkHref={`#icon${rating >= 1 ? '-full' : ''}-star`}></use>
      </svg>
      <svg width="17" height="16" aria-hidden="true">
        <use xlinkHref={`#icon${rating >= 2 ? '-full' : ''}-star`}></use>
      </svg>
      <svg width="17" height="16" aria-hidden="true">
        <use xlinkHref={`#icon${rating >= 3 ? '-full' : ''}-star`}></use>
      </svg>
      <svg width="17" height="16" aria-hidden="true">
        <use xlinkHref={`#icon${rating >= 4 ? '-full' : ''}-star`}></use>
      </svg>
      <svg width="17" height="16" aria-hidden="true">
        <use xlinkHref={`#icon${rating === 5 ? '-full' : ''}-star`}></use>
      </svg>
      <p className="visually-hidden">Рейтинг: 5</p>
      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewsCount}</p>
    </div>
  );
}
