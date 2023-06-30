import { ScreenNames } from '../../const';
import { useAppSelector } from '../../hooks';
import { getSelectedCameraData } from '../../store/cameras-data/selectors';
import Modal from '../modal/modal';
import { humanizePrice } from '../../utils';

type ModalAddItemProps = {
  currentScreenName: string;
  setModalAddItem: (arg:boolean) => void;
  isModalAddItem: boolean;
}

export default function ModalAddItem({currentScreenName, setModalAddItem, isModalAddItem}: ModalAddItemProps): JSX.Element {
  const selectedCameraData = useAppSelector(getSelectedCameraData);
  const {name, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, vendorCode, category, level} = selectedCameraData;
  const isProductScreen = currentScreenName === ScreenNames.Product;

  const handleModalClose = () => {
    setModalAddItem(false);
    document.body.style.overflowY = '';
  };

  return (
    <Modal onClose={handleModalClose}>
      <div className={`modal ${isModalAddItem ? 'is-active' : ''}`}>
        <div className="modal__wrapper">
          <div className="modal__overlay"></div>
          <div className="modal__content">
            <p className="title title--h4">Добавить товар в корзину</p>
            <div className="basket-item basket-item--short">
              <div className="basket-item__img">
                <picture>
                  <source type="image/webp" srcSet={`${isProductScreen ? `../${previewImgWebp}` : previewImgWebp}, ${isProductScreen ? `../${previewImgWebp2x}` : previewImgWebp2x}`} />
                  <img src={isProductScreen ? `../${previewImg}` : previewImg} srcSet={isProductScreen ? `../${previewImg2x}` : previewImg2x} width="280" height="240" alt={name} />
                </picture>
              </div>
              <div className="basket-item__description">
                <p className="basket-item__title">{name}</p>
                <ul className="basket-item__list">
                  <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
                  </li>
                  <li className="basket-item__list-item">{category}</li>
                  <li className="basket-item__list-item">{level} уровень</li>
                </ul>
                <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{humanizePrice(price)} ₽</p>
              </div>
            </div>
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
                <svg width="24" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-add-basket"></use>
                </svg>Добавить в корзину
              </button>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleModalClose}>
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
