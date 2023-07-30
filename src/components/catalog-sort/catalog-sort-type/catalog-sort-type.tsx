import { useLocation, useNavigate } from 'react-router-dom';
import { SortTypes } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setCurrentSortType, sortCamerasData } from '../../../store/cameras-data/cameras-data';
import { getCurrentSortType } from '../../../store/cameras-data/selectors';

export default function CatalogSortType(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentSortType = useAppSelector(getCurrentSortType);

  const handleSortClick = (evt : React.MouseEvent<HTMLDivElement>) => {
    const target = evt.target as HTMLInputElement;

    if (target.tagName === 'INPUT' && target.name === 'sort') {
        dispatch(setCurrentSortType(target.id));
        dispatch(sortCamerasData());
        navigate({ search: queryParams.toString(), hash: location.hash });
      }
  };

  return (
    <div className="catalog-sort__type" onClick = {handleSortClick}>
      <div className="catalog-sort__btn-text">
        <input type="radio" id="sortPrice" name="sort" checked={currentSortType === SortTypes.SortByPrice}/>
        <label htmlFor="sortPrice">по цене</label>
      </div>
      <div className="catalog-sort__btn-text">
        <input type="radio" id="sortPopular" name="sort" checked={currentSortType === SortTypes.SortByPopular}/>
        <label htmlFor="sortPopular">по популярности</label>
      </div>
    </div>
  );
}
