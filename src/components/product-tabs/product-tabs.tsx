import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getProductData } from '../../store/product-data/selectors';

export default function ProductTabs(): JSX.Element | null {
  const productData = useAppSelector(getProductData);
  const [activeTab, setTab] = useState<string | null>('Описание');

  if (productData) {
    const {category, type, vendorCode, level, description} = productData;
    const isCharacteristicsTab = activeTab === 'Характеристики';
    const isDescriptionTab = activeTab === 'Описание';

    const onTabButtonHandle = (evt : React.MouseEvent<HTMLDivElement>) => {
      const target = evt.target as HTMLElement;
      if (target.tagName === 'BUTTON') {
        setTab(target.textContent);
      }
    };

    return (
      <div className="tabs product__tabs">
        <div className="tabs__controls product__tabs-controls" onClick={onTabButtonHandle}>
          <button className={`tabs__control ${isCharacteristicsTab ? 'is-active' : ''}`} type="button">Характеристики</button>
          <button className={`tabs__control ${isDescriptionTab ? 'is-active' : ''}`} type="button">Описание</button>
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
    );}
  return null;
}
