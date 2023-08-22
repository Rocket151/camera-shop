import { MouseEventHandler } from 'react';
import Modal from '../modal/modal';
import FocusLock from 'react-focus-lock';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';

type ModalAddItemSuccessProps = {
  setModalAddItemSuccess: (arg:boolean) => void;
  isModalAddItemSuccess: boolean;
  isProductScreen?: boolean;
}

export default function ModalAddItemSuccess({setModalAddItemSuccess, isModalAddItemSuccess, isProductScreen}: ModalAddItemSuccessProps): JSX.Element {

  const handleModalCloseOnOverlay: MouseEventHandler<HTMLDivElement> = (evt) => {
    if (evt.target === evt.currentTarget) {
      setModalAddItemSuccess(false);
      document.body.style.overflowY = '';
    }
  };

  const handleModalClose = () => {
    setModalAddItemSuccess(false);
    document.body.style.overflowY = '';
  };

  return (
    <FocusLock disabled={!isModalAddItemSuccess}>
      <Modal onClose={handleModalClose}>
        <div className={`modal ${isModalAddItemSuccess ? 'is-active' : ''}`} data-testid="add-item-success">
          <div className="modal__wrapper">
            <div className="modal__overlay" onClick={handleModalCloseOnOverlay}></div>
            <div className="modal__content">
              <p className="title title--h4">Товар успешно добавлен в корзину</p>
              <svg className="modal__icon" width="86" height="80" aria-hidden="true">
                <use xlinkHref="#icon-success"></use>
              </svg>
              <div className="modal__buttons">
                {
                  isProductScreen ? 
                    <Link className="btn btn--transparent modal__btn" onClick={handleModalClose} to={AppRoute.Root}>Продолжить покупки</Link> :
                    <button className="btn btn--transparent modal__btn" onClick={handleModalClose}>Продолжить покупки</button>
                }
                <Link className="btn btn--purple modal__btn modal__btn--fit-width" to={AppRoute.Basket}>Перейти в корзину</Link>
              </div>
              <button className="cross-btn" type="button" aria-label="Закрыть попап">
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
