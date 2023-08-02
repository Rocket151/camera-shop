import { useState } from 'react';
import { FilterByPriceTypes } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { filterCamerasDataByMaxPrice, filterCamerasDataByMinPrice } from '../../../store/cameras-data/cameras-data';
import { getCamerasData, getCamerasDataLoadingStatus } from '../../../store/cameras-data/selectors';

export default function CatalogFilterByPrice(): JSX.Element | null {
  const camerasData = useAppSelector(getCamerasData);
  const isCamerasDataLoadingStatus = useAppSelector(getCamerasDataLoadingStatus);
  const dispatch = useAppDispatch();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  if(!isCamerasDataLoadingStatus) {
    const cameraDataWithMinPrice = camerasData.length ? camerasData.reduce((prevCameraData, currentCameraData) => prevCameraData.price < currentCameraData.price ? prevCameraData : currentCameraData) : {price: 0};
    const cameraDataWithMaxPrice = camerasData.length ? camerasData.reduce((prevCameraData, currentCameraData) => prevCameraData.price > currentCameraData.price ? prevCameraData : currentCameraData) : {price: 0};

    const handleFilterChange = (evt : React.ChangeEvent<HTMLInputElement>) => {
      const target = evt.target;

      if(target.name === FilterByPriceTypes.Min) {

        if((Number(target.value) < cameraDataWithMinPrice.price) && cameraDataWithMinPrice.price !== 0) {
          setMinPrice(cameraDataWithMinPrice.price.toString());
          dispatch(filterCamerasDataByMinPrice(Number(cameraDataWithMinPrice.price.toString())));

          return;
        }
        setMinPrice(target.value);
        dispatch(filterCamerasDataByMinPrice(Number(target.value)));
      }

      if(target.name === FilterByPriceTypes.Max) {
        if((Number(target.value) > cameraDataWithMaxPrice.price) && cameraDataWithMaxPrice.price !== 0 ) {
          setMaxPrice(cameraDataWithMaxPrice.price.toString());
          dispatch(filterCamerasDataByMaxPrice(Number(cameraDataWithMaxPrice.price.toString())));

          return;
        }
        setMaxPrice(target.value);
        dispatch(filterCamerasDataByMaxPrice(Number(target.value)));
      }
    };

    return (
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="custom-input">
            <label>
              <input type="number" name="priceMin" value={minPrice} min={0} placeholder={cameraDataWithMinPrice.price.toString()} onChange={handleFilterChange} />
            </label>
          </div>
          <div className="custom-input">
            <label>
              <input type="number" name="priceMax" value={maxPrice} min={0} placeholder={cameraDataWithMaxPrice.price.toString()} onChange={handleFilterChange} />
            </label>
          </div>
        </div>
      </fieldset>
    );
  }

  return null;
}
