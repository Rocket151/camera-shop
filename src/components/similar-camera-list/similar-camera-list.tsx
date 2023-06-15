import ProductCardList from "../product-card-list/product-card-list";

export default function SimilarCamerasList(): JSX.Element {
   const camerasData = useAppSelector(getSimilarCamerasData);
  
  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            <ProductCardList camerasData={camerasData}/>
            <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled>
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд">
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
