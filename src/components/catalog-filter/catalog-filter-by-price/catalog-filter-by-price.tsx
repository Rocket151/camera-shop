import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { FilterByPriceTypes } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { filterCamerasData, setProductMaxPrice, setProductMinPrice, sortCamerasData } from '../../../store/cameras-data/cameras-data';
import { getCamerasData, getCamerasDataFromServer, getCamerasDataLoadingStatus } from '../../../store/cameras-data/selectors';
import { getInitalMaxPrice, getInitalMinPrice } from '../../../utils';
import { CatalogFilterInitialState } from '../catalog-filter';

type CatalogFilterByPriceProps = {
  filters: CatalogFilterInitialState;
}

export default function CatalogFilterByPrice({filters}: CatalogFilterByPriceProps): JSX.Element | null {
  const camerasData = useAppSelector(getCamerasData);
  const isCamerasDataLoadingStatus = useAppSelector(getCamerasDataLoadingStatus);
  const camerasDataFromServer = useAppSelector(getCamerasDataFromServer);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const debouncedSetMinValue = useDebouncedCallback((inputValue: string, maxPriceData: number, minPriceData: number) => {
    if((Number(inputValue) < minPriceData || Number(inputValue) > maxPriceData) && inputValue !== '') {
      setMinPrice(minPriceData.toString());
      dispatch(setProductMinPrice(minPriceData));
      dispatch(filterCamerasData(filters));
      dispatch(sortCamerasData());
      queryParams.set('price_gte', minPriceData.toString());
      navigate({ search: queryParams.toString(), hash: location.hash });

      return;
    }

    if(inputValue === '') {
      setMinPrice(inputValue);
      const initialMinPrice = getInitalMinPrice(camerasDataFromServer);
      dispatch(setProductMinPrice(initialMinPrice));
      dispatch(filterCamerasData(filters));
      dispatch(sortCamerasData());
      queryParams.set('price_gte', initialMinPrice.toString());
      navigate({ search: queryParams.toString(), hash: location.hash });

      return;
    }


    dispatch(setProductMinPrice(Number(minPrice)));
    dispatch(filterCamerasData(filters));
    dispatch(sortCamerasData());
    queryParams.set('price_gte', minPrice.toString());
    navigate({ search: queryParams.toString(), hash: location.hash });
  }, 1000);

  const debouncedSetMaxValue = useDebouncedCallback((inputValue: string, maxPriceData: number, minPriceData: number) => {
    if((Number(inputValue) > maxPriceData || Number(inputValue) < minPriceData) && inputValue !== '') {
      setMaxPrice(maxPriceData.toString());
      dispatch(setProductMaxPrice(maxPriceData));
      dispatch(filterCamerasData(filters));
      dispatch(sortCamerasData());
      queryParams.set('price_lte', maxPriceData.toString());
      navigate({ search: queryParams.toString(), hash: location.hash });

      return;
    }

    if(inputValue === '') {
      setMaxPrice(inputValue);
      const initialMaxPrice = getInitalMaxPrice(camerasDataFromServer);
      dispatch(setProductMaxPrice(initialMaxPrice));
      dispatch(filterCamerasData(filters));
      dispatch(sortCamerasData());
      queryParams.set('price_lte', initialMaxPrice.toString());
      navigate({ search: queryParams.toString(), hash: location.hash });

      return;
    }

    dispatch(setProductMaxPrice(Number(inputValue)));
    dispatch(filterCamerasData(filters));
    dispatch(sortCamerasData());
    queryParams.set('price_lte', maxPrice.toString());
    navigate({ search: queryParams.toString(), hash: location.hash });
  }, 1000);

  if(!isCamerasDataLoadingStatus) {

    const handleFilterChange = (evt : React.ChangeEvent<HTMLInputElement>) => {
      const target = evt.target;

      const minPriceData = camerasData.reduce((prevCameraData, currentCameraData) => prevCameraData.price < currentCameraData.price ? prevCameraData : currentCameraData).price;
      const maxPriceData = camerasData.reduce((prevCameraData, currentCameraData) => prevCameraData.price > currentCameraData.price ? prevCameraData : currentCameraData).price;

      if(target.name === FilterByPriceTypes.Min) {
        setMinPrice(target.value.replace(/[^0-9]/g, ''));
        debouncedSetMinValue(target.value.replace(/[^0-9]/g, ''), maxPriceData, minPriceData);
      }

      if(target.name === FilterByPriceTypes.Max) {
        setMaxPrice(target.value.replace(/[^0-9]/g, ''));
        debouncedSetMaxValue(target.value.replace(/[^0-9]/g, ''), maxPriceData, minPriceData);
      }
    };

    return (
      <fieldset className="catalog-filter__block">
        <legend className="title title--h5">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="custom-input" data-testid="priceMin">
            <label>
              <input type="text" name="priceMin" value={minPrice} placeholder={camerasData.length ? camerasData.reduce((prevCameraData, currentCameraData) => prevCameraData.price < currentCameraData.price ? prevCameraData : currentCameraData).price.toString() : ''} onChange={handleFilterChange} />
            </label>
          </div>
          <div className="custom-input" data-testid="priceMax">
            <label>
              <input type="text" name="priceMax" value={maxPrice} placeholder={camerasData.length ? camerasData.reduce((prevCameraData, currentCameraData) => prevCameraData.price > currentCameraData.price ? prevCameraData : currentCameraData).price.toString() : ''} onChange={handleFilterChange} />
            </label>
          </div>
        </div>
      </fieldset>
    );
  }

  return null;
}
