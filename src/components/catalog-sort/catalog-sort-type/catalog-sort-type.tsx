import { useLocation, useNavigate } from 'react-router-dom';
import { SortOrders, SortTypes } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setCurrentSortOrder, setCurrentSortType, sortCamerasData } from '../../../store/cameras-data/cameras-data';
import { getCurrentSortOrder, getCurrentSortType } from '../../../store/cameras-data/selectors';

export default function CatalogSortType(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentSortType = useAppSelector(getCurrentSortType);
  const currentSortOrder = useAppSelector(getCurrentSortOrder);

  const handleSortChange = (evt : React.ChangeEvent<HTMLInputElement>) => {
    const target = evt.target as HTMLInputElement;
    if(!currentSortOrder.length) {
      dispatch(setCurrentSortOrder(SortOrders.Up));
    }

    dispatch(setCurrentSortType(target.id));
    dispatch(sortCamerasData());
    queryParams.set('sortType', target.id);
    navigate({ search: queryParams.toString(), hash: location.hash });
  };

  return (
    <div className="catalog-sort__type">
      <div className="catalog-sort__btn-text">
        <input type="radio" id="sortPrice" name="sort" checked={currentSortType === SortTypes.SortByPrice} onChange={handleSortChange}/>
        <label htmlFor="sortPrice">по цене</label>
      </div>
      <div className="catalog-sort__btn-text">
        <input type="radio" id="sortPopular" name="sort" checked={currentSortType === SortTypes.SortByPopular} onChange={handleSortChange}/>
        <label htmlFor="sortPopular">по популярности</label>
      </div>
    </div>
  );
}
