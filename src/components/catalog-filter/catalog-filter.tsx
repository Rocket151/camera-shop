import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setFiltersData, filterCamerasData, sortCamerasData, resetFilters } from '../../store/cameras-data/cameras-data';
import { getFiletrsData } from '../../store/cameras-data/selectors';
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
    dispatch(resetFilters());
    dispatch(filterCamerasData(initialState));
    setFilters(initialState);
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
              <input type="checkbox" name="photocamera" checked={filtersData.photocamera} disabled={filters.videocamera} onChange={handleFilterClick} /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Фотокамера</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="videocamera" checked={filtersData.videocamera} disabled={filters.photocamera} onChange={handleFilterClick} /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="digital" checked={filtersData.digital} onChange={handleFilterClick}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Цифровая</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="film" checked={filtersData.film} disabled={filtersData.videocamera} onChange={handleFilterClick}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="snapshot" checked={filtersData.snapshot} disabled={filtersData.videocamera} onChange={handleFilterClick}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Моментальная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="collection" checked={filtersData.collection} onChange={handleFilterClick} /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Коллекционная</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="zero" checked={filtersData.zero} onChange={handleFilterClick}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Нулевой</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="nonProfessional" checked={filtersData.nonProfessional} onChange={handleFilterClick}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Любительский</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="professional" checked={filtersData.professional} onChange={handleFilterClick}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Профессиональный</span>
            </label>
          </div>
        </fieldset>
        <button className="btn catalog-filter__reset-btn" onClick={resetFiltersData} type="reset">Сбросить фильтры
        </button>
      </form>
    </div>
  );
}
