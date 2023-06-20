import { useEffect, useState } from 'react';
import { MAX_PRODUCTS_PAGE } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCamerasData } from '../../store/cameras-data/selectors';
import { CamerasData } from '../../types/cameras-data';
import { getPagesNumber } from '../../utils';
import PaginationList from '../pagination-list/pagination-list';
import ProductCardList from '../product-card-list/product-card-list';

type ProductAndPaginationListProps = {
    setModalAddItem: (arg: boolean) => void;
}

export default function ProductAndPaginationList({setModalAddItem}: ProductAndPaginationListProps) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<CamerasData[]>([]);
  const camerasData = useAppSelector(getCamerasData);
  const totalPages = getPagesNumber(camerasData);
  useEffect(() => {
    setData(camerasData.slice((page - 1) * MAX_PRODUCTS_PAGE, page * MAX_PRODUCTS_PAGE));
  }, [page, camerasData]);

  return (
    <>
      <ProductCardList camerasData={data} setModalAddItem={setModalAddItem}/>
      <PaginationList setPage={setPage} totalPages={totalPages} currentPage={page}/>
    </>
  );
}
