import { useAppSelector } from '../../hooks';
import { getSimilarCamerasData } from '../../store/similar-cameras-data/selectors';
import ProductCard from '../product-card/product-card';
import { CAROUSEL_VISIBLE_CLASS, MAX_CAROUSEL_ITEMS, MIN_SLIDER_ITEM_INDEX} from '../../const';
import { useState } from 'react';

type SimilarCamerasListProps = {
    setModalAddItem: (arg: boolean) => void;
}


export default function SimilarCamerasList({setModalAddItem}: SimilarCamerasListProps): JSX.Element {
  const camerasData = useAppSelector(getSimilarCamerasData);
  const [similarCameraIndex, setSimilarCameraIndex] = useState(MIN_SLIDER_ITEM_INDEX);

  const handleNextButtonClick = () => {
    setSimilarCameraIndex((prev) => prev + MAX_CAROUSEL_ITEMS);
  };
  const handlePrevButtonClick = () => {
    setSimilarCameraIndex((prev) => prev - MAX_CAROUSEL_ITEMS);
  };

    useEffect(() => {
    if(camerasData.length) {
      const cardsId = [];

      for(let i = 0; i < camerasData.length; i++) {
        cardsId.push(camerasData[i]?.id.toString());
      }
      dispatch(fetchAllReviewsDataAction(cardsId));
    }
  }, [camerasData]);

  const isDisabledPrevBtn = similarCameraIndex === MIN_SLIDER_ITEM_INDEX;
  const isDisabledNextBtn = similarCameraIndex === camerasData.length - MAX_CAROUSEL_ITEMS;

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {camerasData.map((cameraData, index) => {
              if (index >= similarCameraIndex && index < similarCameraIndex + MAX_CAROUSEL_ITEMS) {

                return <ProductCard setModalAddItem={setModalAddItem} carouselClass={CAROUSEL_VISIBLE_CLASS} cameraData={cameraData} key={cameraData.id}/>;
              }

              return <ProductCard setModalAddItem={setModalAddItem} cameraData={cameraData} key={cameraData.id}/>;
            })}
          </div>
          <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" data-testid="next" disabled={isDisabledNextBtn} onClick={handleNextButtonClick}>
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" data-testid="prev" disabled={isDisabledPrevBtn} onClick={handlePrevButtonClick}>
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
