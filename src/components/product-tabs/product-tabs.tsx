import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoute, ProductTabNames, TabsHash } from '../../const';
import { useAppSelector } from '../../hooks';
import { getProductData } from '../../store/product-data/selectors';

export default function ProductTabs(): JSX.Element | null {
  const productData = useAppSelector(getProductData);
  const [activeTab, setTab] = useState(ProductTabNames.Description);
  const navigate = useNavigate();
  const {id} = useParams() as { id: string };
  const {category, type, vendorCode, level, description} = productData;

  const isCharacteristicsTab = activeTab === ProductTabNames.Characteristics;
  const isDescriptionTab = activeTab === ProductTabNames.Description;

  const onCharacteristicsTabHandle = () => {
    setTab(ProductTabNames.Characteristics);
    navigate(AppRoute.Product + id.toString() + TabsHash.Characteristics);
  };
  const onDescriptionTabHandle = () => {
    setTab(ProductTabNames.Description);
    navigate(AppRoute.Product + id.toString() + TabsHash.Description);
  };

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button className={`tabs__control ${isCharacteristicsTab ? 'is-active' : ''}`} type="button" onClick={onCharacteristicsTabHandle}>Характеристики</button>
        <button className={`tabs__control ${isDescriptionTab ? 'is-active' : ''}`} type="button" onClick={onDescriptionTabHandle}>Описание</button>
      </div>
      <div className="tabs__content">
        <div className={`tabs__element ${isCharacteristicsTab ? 'is-active' : ''}`}>
          <ul className="product__tabs-list">
            <li className="item-list"><span className="item-list__title">Артикул:</span>
              <p className="item-list__text">{vendorCode}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Категория:</span>
              <p className="item-list__text">{category}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{type}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{level}</p>
            </li>
          </ul>
        </div>
        <div className={`tabs__element ${isDescriptionTab ? 'is-active' : ''}`}>
          <div className="product__tabs-text">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
