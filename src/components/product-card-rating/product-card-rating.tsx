import { CamerasData } from '../../types/cameras-data';


type ProductCardRatingProps = {
  reviewsCount: number;
  cameraData: CamerasData;
}


export default function ProductCardRating({reviewsCount, cameraData}: ProductCardRatingProps): JSX.Element | null {
  const rating = cameraData.rating;

  if(rating !== undefined) {
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
        <p className="visually-hidden">Рейтинг: {rating}</p>
        <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewsCount}</p>
      </div>
    );
  }
  return null;
}
