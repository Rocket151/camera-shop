import { useAppSelector } from '../../hooks';
import { getCamerasData } from '../../store/cameras-data/selectors';
import ProductCard from '../product-card/product-card';

export default function ProductCardList(): JSX.Element {
  const camerasData = useAppSelector(getCamerasData);

  return (
    <div className="cards catalog__cards">
      {camerasData.map((cameraData) => <ProductCard cameraData={cameraData} key={cameraData.id}/>)}
    </div>
  );
}
