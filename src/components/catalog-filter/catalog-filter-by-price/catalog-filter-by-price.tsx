import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { FilterByPriceTypes } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { filterCamerasData, setProductMaxPrice, setProductMinPrice, sortCamerasData } from '../../../store/cameras-data/cameras-data';
import { getCamerasData, getCamerasDataFromServer, getCamerasDataLoadingStatus } from '../../../store/cameras-data/selectors';
import { CatalogFilterInitialState } from '../catalog-filter';

type CatalogFilterByPriceProps = {
  filters: CatalogFilterInitialState;
}

export default function CatalogFilterByPrice({filters}: CatalogFilterByPriceProps): JSX.Element | null {
  const camerasData = useAppSelector(getCamerasData);
  const isCamerasDataLoadingStatus = useAppSelector(getCamerasDataLoadingStatus);
  const camerasDataFromServer = useAppSelector(getCamerasDataFromServer);
  const dispatch = useAppDispatch();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const debouncedSetMinValue = useDebouncedCallback((inputValue: string, maxPriceData: number, minPriceData: number) => {
    if(Number(inputValue) < minPriceData || Number(inputValue) > maxPriceData) {
      setMinPrice(minPriceData.toString());
      dispatch(setProductMinPrice(minPriceData));
      dispatch(filterCamerasData(filters));
      dispatch(sortCamerasData());
      return;
    }
    setMinPrice(inputValue);
    dispatch(setProductMinPrice(Number(minPrice)));
    dispatch(filterCamerasData(filters));
    dispatch(sortCamerasData());

  }, 1000);

  const debouncedSetMaxValue = useDebouncedCallback((inputValue: string, maxPriceData: number, minPriceData: number) => {
    if(Number(inputValue) > maxPriceData || Number(inputValue) < minPriceData) {
      setMaxPrice(maxPriceData.toString());
      dispatch(setProductMaxPrice(maxPriceData));
      dispatch(filterCamerasData(filters));
      dispatch(sortCamerasData());

      return;
    }
    setMaxPrice(inputValue);
    dispatch(setProductMaxPrice(Number(inputValue)));
    dispatch(filterCamerasData(filters));
    dispatch(sortCamerasData());
  }, 1000);

  if(!isCamerasDataLoadingStatus) {

    const handleFilterChange = (evt : React.ChangeEvent<HTMLInputElement>) => {
      const target = evt.target;

      const minPriceData = camerasDataFromServer.reduce((prevCameraData, currentCameraData) => prevCameraData.price < currentCameraData.price ? prevCameraData : currentCameraData).price;
      const maxPriceData = camerasDataFromServer.reduce((prevCameraData, currentCameraData) => prevCameraData.price > currentCameraData.price ? prevCameraData : currentCameraData).price;

      if(target.name === FilterByPriceTypes.Min) {
        setMinPrice(target.value);
        debouncedSetMinValue(target.value, maxPriceData, minPriceData);
      }

      if(target.name === FilterByPriceTypes.Max) {
        setMaxPrice(target.value);
        debouncedSetMaxValue(target.value, maxPriceData, minPriceData)
      }
    };

    return (
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="custom-input">
            <label>
              <input type="number" name="priceMin" value={minPrice} min={0} placeholder={camerasData.length ? camerasData.reduce((prevCameraData, currentCameraData) => prevCameraData.price < currentCameraData.price ? prevCameraData : currentCameraData).price.toString() : ''} onChange={handleFilterChange} />
            </label>
          </div>
          <div className="custom-input">
            <label>
              <input type="number" name="priceMax" value={maxPrice} min={0} placeholder={camerasData.length ? camerasData.reduce((prevCameraData, currentCameraData) => prevCameraData.price > currentCameraData.price ? prevCameraData : currentCameraData).price.toString() : ''} onChange={handleFilterChange} />
            </label>
          </div>
        </div>
      </fieldset>
    );
  }

  return null;
}
