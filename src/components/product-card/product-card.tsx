import { Link } from 'react-router-dom';
import { AppRoute, TabsHash } from '../../const';
import { useAppDispatch } from '../../hooks';
import { selectCameraData } from '../../store/cameras-data/cameras-data';
import { CamerasData } from '../../types/cameras-data';
import { humanizePrice } from '../../utils';
import ProductCardRating from '../product-card-rating/product-card-rating';

type ProductCardProps = {
  cameraData: CamerasData;
  carouselClass?: string;
  setModalAddItem: (arg: boolean) => void;
}

export default function ProductCard({cameraData, carouselClass, setModalAddItem}: ProductCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {id, name, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, reviewCount} = cameraData;

  const handleModalOpen = () => {
    dispatch(selectCameraData(cameraData));
    setModalAddItem(true);
    document.body.style.overflow = 'hidden';
  };

  return (
    <div className={`product-card ${carouselClass ? carouselClass : ''}`} data-testid="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${carouselClass ? `../${previewImgWebp}` : previewImgWebp}, ${carouselClass ? `../${previewImgWebp2x}` : previewImgWebp2x}`} />
          <img src={carouselClass ? `../${previewImg}` : previewImg} srcSet={carouselClass ? `../${previewImg2x}` : previewImg2x} width="280" height="240" alt={name} />
        </picture>
      </div>
      <div className="product-card__info">
        <ProductCardRating reviewsCount={reviewCount} cameraData={cameraData}/>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{`${humanizePrice(price)} ₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button" onClick={handleModalOpen}>Купить
        </button>
        <Link className="btn btn--transparent" to={AppRoute.Product + id.toString() + TabsHash.Description}>Подробнее
        </Link>
      </div>
    </div>
  );
}
