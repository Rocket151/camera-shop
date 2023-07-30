import CatalogSortOrder from './catalog-sort-order/catalog-sort-order';
import CatalogSortType from './catalog-sort-type/catalog-sort-type';

export default function CatalogSort(): JSX.Element {
  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>

          <CatalogSortType />
          <CatalogSortOrder />
        </div>
      </form>
    </div>
  );
}
