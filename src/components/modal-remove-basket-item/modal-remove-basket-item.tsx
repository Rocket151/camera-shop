import { MouseEventHandler } from 'react';
import Modal from '../modal/modal';
import FocusLock from 'react-focus-lock';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteBasketItem } from '../../store/basket-data/basket-data';
import { getItemToRemoveFromBasket } from '../../store/basket-data/selectors';

type ModalRemoveBasketItemProps = {
  setModalRemoveBasketItem: (arg:boolean) => void;
  isModalRemoveBasketItem: boolean;
}

export default function ModalRemoveBasketItem({setModalRemoveBasketItem, isModalRemoveBasketItem}: ModalRemoveBasketItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const itemToRemoveFromBasket = useAppSelector(getItemToRemoveFromBasket);
  const {name, type, level, vendorCode,
    previewImg, previewImgWebp, previewImgWebp2x, previewImg2x, id} = itemToRemoveFromBasket;

  const handleModalCloseOnOverlay: MouseEventHandler<HTMLDivElement> = (evt) => {
    if (evt.target === evt.currentTarget) {
      setModalRemoveBasketItem(false);
      document.body.style.overflowY = '';
    }
  };

  const handleModalClose = () => {
    setModalRemoveBasketItem(false);
    document.body.style.overflowY = '';
  };

  const handleDeleteItemFromBasketClick = () => {
    dispatch(deleteBasketItem(id));
    setModalRemoveBasketItem(false);
    document.body.style.overflowY = '';
  };

  return (
    <FocusLock disabled={!isModalRemoveBasketItem}>
      <Modal onClose={handleModalClose}>
        <div className={`modal ${isModalRemoveBasketItem ? 'is-active' : ''}`} data-testid="add-item-success">
          <div className="modal__wrapper">
            <div className="modal__overlay" onClick={handleModalCloseOnOverlay}></div>
            <div className="modal__content">
              <p className="title title--h4">Удалить этот товар?</p>
              <div className="basket-item basket-item--short">
                <div className="basket-item__img">
                  <picture>
                    <source type="image/webp" srcSet={`../${previewImgWebp}, ../${previewImgWebp2x}`} />
                    <img src={`../${previewImg}`} srcSet={`../${previewImg2x}`} width="140" height="120" alt={name} />
                  </picture>
                </div>
                <div className="basket-item__description">
                  <p className="basket-item__title">{name}</p>
                  <ul className="basket-item__list">
                    <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
                    </li>
                    <li className="basket-item__list-item">{type}</li>
                    <li className="basket-item__list-item">{level}</li>
                  </ul>
                </div>
              </div>
              <div className="modal__buttons">
                <button className="btn btn--purple modal__btn modal__btn--half-width" type="button" onClick={handleDeleteItemFromBasketClick}>Удалить
                </button>
                <button className="btn btn--transparent modal__btn modal__btn--half-width" onClick={handleModalClose}>Продолжить покупки
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
    </FocusLock>
  );
}
