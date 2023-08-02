import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { filterCamerasData } from "../../store/cameras-data/cameras-data";

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
  const [filters, setFilters] = useState(initialState);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    dispatch(filterCamerasData(filters));
  },[filters, dispatch]);

  const handleFilterClick = (evt : React.ChangeEvent<HTMLInputElement>) => {
    const targetName = evt.target.name;
    const currentFilters = {
      ...filters,
      [targetName]: !filters[targetName as keyof CatalogFilterInitialState],
    }
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

  const resetFilters = () => {
    setFilters(initialState);
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input type="number" name="price" placeholder="от" />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input type="number" name="priceUp" placeholder="до" />
              </label>
            </div>
          </div>
        </fieldset>
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
              <input type="checkbox" name="film" checked={filters.film} disabled={filters.videocamera} onChange={handleFilterClick}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Плёночная</span>
            </label>
          </div>
          <div className="custom-checkbox catalog-filter__item">
            <label>
              <input type="checkbox" name="snapshot" checked={filters.snapshot} disabled={filters.videocamera} onChange={handleFilterClick}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Моментальная</span>
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
        <button className="btn catalog-filter__reset-btn" onClick={resetFilters} type="reset">Сбросить фильтры
        </button>
      </form>
    </div>
  );
}
