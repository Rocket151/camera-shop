import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, HASH, MAX_PRODUCTS_PAGE } from '../../const';
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
  const navigate = useNavigate();
  const camerasData = useAppSelector(getCamerasData);
  const totalPages = getPagesNumber(camerasData);

  useEffect(() => {
    if(camerasData.length) {
      navigate(AppRoute.Root + HASH + page.toString());

      const slicedCamerasData = camerasData.slice((page - 1) * MAX_PRODUCTS_PAGE, page * MAX_PRODUCTS_PAGE);

      setData(slicedCamerasData);
    }
  }, [page, navigate, camerasData]);

  return (
    <>
      <ProductCardList camerasData={data} setModalAddItem={setModalAddItem}/>
      <PaginationList setPage={setPage} totalPages={totalPages} currentPage={page}/>
    </>
  );
}
