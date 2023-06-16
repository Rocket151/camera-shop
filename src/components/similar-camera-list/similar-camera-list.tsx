import { useAppSelector } from '../../hooks';
import { getSimilarCamerasData } from '../../store/similar-cameras-data/selectors';
import Slider from 'react-slick';
import ProductCard from '../product-card/product-card';

const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
};

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" onClick={onClick}>
      <svg width="7" height="12" aria-hidden="true">
        <use xlinkHref="#icon-arrow"></use>
      </svg>
    </button>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" onClick={onClick}>
      <svg width="7" height="12" aria-hidden="true">
        <use xlinkHref="#icon-arrow"></use>
      </svg>
    </button>
  );
}

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
                return <ProductCard carouselClass={CARO} cameraData={cameraData} key={cameraData.id}/>
              }
              return <ProductCard cameraData={cameraData} key={cameraData.id}/>
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
