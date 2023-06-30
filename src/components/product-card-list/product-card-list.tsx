import { CamerasData } from '../../types/cameras-data';
import ProductCard from '../product-card/product-card';

type ProductCardListProps = {
  camerasData: CamerasData[];
  setModalAddItem: (arg: boolean) => void;
}

export default function ProductCardList({camerasData, setModalAddItem}: ProductCardListProps): JSX.Element {

  return (
    <div className="cards catalog__cards">
      {camerasData.map((cameraData) => <ProductCard setModalAddItem={setModalAddItem} cameraData={cameraData} key={cameraData.id}/>)}
    </div>
  );
}
