import { useAppSelector } from '../../hooks';
import { getSimilarCamerasData } from '../../store/similar-cameras-data/selectors';
import ProductCardList from '../product-card-list/product-card-list';
import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: true,
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
            <Slider {...settings}>
              <ProductCardList camerasData={camerasData}/>
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
