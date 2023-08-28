import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, TabsHash } from '../../const';
import { useAppDispatch } from '../../hooks';
import { fetchProductDataAction, fetchReviewsDataAction, fetchSimilarCamerasDataAction } from '../../store/api-actions';
import { getPromoData } from '../../store/promo-data/selectors';

export default function Promo(): JSX.Element | null {
  const promoData = useSelector(getPromoData);
  const dispatch = useAppDispatch();

  if (promoData) {
    const {id, name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = promoData;
    const handleRedirectToProductPage = () => {
      dispatch(fetchProductDataAction(id.toString()));
      dispatch(fetchSimilarCamerasDataAction(id.toString()));
      dispatch(fetchReviewsDataAction(id.toString()));
    };
    return (
      <div className="banner">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x}`} /><img src={previewImg} srcSet={previewImg2x} width="1280" height="280" alt="баннер" />
        </picture>
        <p className="banner__info"><span className="banner__message">Новинка!</span><span className="title title--h1">{name}</span><span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
          <Link className="btn" onClick={handleRedirectToProductPage} to={AppRoute.Product + id.toString() + TabsHash.Description}>Подробнее</Link>
        </p>
      </div>
    );
  }
  return null;
}
