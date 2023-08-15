import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFiltersData, filterCamerasData, sortCamerasData, setProductMinPrice, setProductMaxPrice, filterByPriceCamerasData } from '../../store/cameras-data/cameras-data';
import { getFiletrsData, getFilteredCamerasData } from '../../store/cameras-data/selectors';
import { getInitalMaxPrice, getInitalMinPrice } from '../../utils';
import CatalogFilterByPrice from './catalog-filter-by-price/catalog-filter-by-price';

export type CatalogFilterInitialState = {
  photocamera: boolean;
  videocamera: boolean;
  digital: boolean;
  film: boolean;
  snapshot: boolean;
  collection: boolean;
  zero: boolean;
  nonProfessional: boolean;
  professional: boolean;
}

const initialState: CatalogFilterInitialState = {
  photocamera: false,
  videocamera: false,
  digital: false,
  film: false,
  snapshot: false,
  collection: false,
  zero: false,
  nonProfessional: false,
  professional: false,
};

export default function CatalogFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const filteredCamerasData = useAppSelector(getFilteredCamerasData);
  const queryParams = new URLSearchParams(location.search);
  const filtersData = useAppSelector(getFiletrsData);
  const [filters, setFilters] = useState(filtersData);

  const handleFilterClick = (evt : React.ChangeEvent<HTMLInputElement>) => {
    const targetName = evt.target.name;
    const currentFilters = {
      ...filters,
      [targetName]: !filters[targetName as keyof CatalogFilterInitialState],
    };

    dispatch(filterCamerasData(currentFilters));
    dispatch(setFiltersData(currentFilters));
    dispatch(filterByPriceCamerasData());
    dispatch(sortCamerasData());

    setFilters(currentFilters);
    for(const key in currentFilters) {
      if(currentFilters[key as keyof CatalogFilterInitialState]) {
        queryParams.set(`${key}`, currentFilters[key as keyof CatalogFilterInitialState].toString());
      } else {
        queryParams.delete(`${key}`);
      }
    }

    navigate({ search: queryParams.toString(), hash: location.hash });
  };

  const resetFiltersData = () => {
    for(const key in filters) {
      queryParams.delete(`${key}`);
    }
    queryParams.delete('price_gte');
    queryParams.delete('price_lte');

    navigate({ search: queryParams.toString(), hash: location.hash });

    dispatch(setProductMinPrice(getInitalMinPrice(filteredCamerasData)));
    dispatch(setProductMaxPrice(getInitalMaxPrice(filteredCamerasData)));
    dispatch(setFiltersData(initialState));
    setFilters(initialState);
    dispatch(filterCamerasData(initialState));
    dispatch(filterByPriceCamerasData());
    dispatch(sortCamerasData());
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <CatalogFilterByPrice filters={filters}/>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="photocamera" checked={filters.photocamera} disabled={filters.videocamera} onChange={handleFilterClick} /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="videocamera" checked={filters.videocamera} disabled={filters.photocamera} onChange={handleFilterClick} /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="digital" checked={filters.digital} onChange={handleFilterClick}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="film" checked={filters.film} disabled={filtersData.videocamera} onChange={handleFilterClick}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="snapshot" checked={filters.snapshot} disabled={filtersData.videocamera} onChange={handleFilterClick}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="collection" checked={filters.collection} onChange={handleFilterClick} /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="zero" checked={filters.zero} onChange={handleFilterClick}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="nonProfessional" checked={filters.nonProfessional} onChange={handleFilterClick}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="professional" checked={filters.professional} onChange={handleFilterClick}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div>
        </fieldset>
        <button className="btn catalog-filter__reset-btn" onClick={resetFiltersData} type="button">Сбросить фильтры
        </button>
      </form>
    </div>
  );
}
