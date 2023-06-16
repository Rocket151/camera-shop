import { useAppSelector } from '../../hooks';
import { getSimilarCamerasData } from '../../store/similar-cameras-data/selectors';
import ProductCard from '../product-card/product-card';
import { CAROUSEL_VISIBLE_CLASS} from '../../const';

export default function SimilarCamerasList(): JSX.Element {
  const camerasData = useAppSelector(getSimilarCamerasData);

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {camerasData.map((cameraData, index) => {
              if (index <= 2) {
                return <ProductCard carouselClass={CAROUSEL_VISIBLE_CLASS} cameraData={cameraData} key={cameraData.id}/>;
              }
              return <ProductCard cameraData={cameraData} key={cameraData.id}/>;
            })}
          </div>
          <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд">
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд">
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
