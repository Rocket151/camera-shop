import { MouseEventHandler } from 'react';
import Modal from '../modal/modal';
import FocusLock from 'react-focus-lock';

type ModalAddItemSuccessProps = {
  setModalAddItemSuccess: (arg:boolean) => void;
  isModalAddItemSuccess: boolean;
}

export default function ModalAddItemSuccess({setModalAddItemSuccess, isModalAddItemSuccess}: ModalAddItemSuccessProps): JSX.Element {

  const handleModalCloseOnOverlay: MouseEventHandler<HTMLDivElement> = (evt) => {
    if (evt.target === evt.currentTarget) {
      setModalAddReviewSuccess(false);
      document.body.style.overflowY = '';
    }
  };

  const handleModalClose = () => {
    setModalAddItemSuccess(false);
    document.body.style.overflowY = '';
  };

  return (
    <FocusLock disabled={!isModalAddReviewSuccess}>
      <Modal onClose={handleModalClose}>
        <div className={`modal ${isModalAddReviewSuccess ? 'is-active' : ''}`} data-testid="add-item-success">
          <div className="modal__wrapper">
            <div className="modal__overlay" onClick={handleModalCloseOnOverlay}></div>
            <div className="modal__content">
              <p className="title title--h4">Товар успешно добавлен в корзину</p>
              <svg className="modal__icon" width="86" height="80" aria-hidden="true">
                <use xlinkHref="#icon-success"></use>
              </svg>
              <div className="modal__buttons">
                <button className="btn btn--transparent modal__btn">Продолжить покупки</button>
                <Link className="btn btn--purple modal__btn modal__btn--fit-width"  to={AppRoute.Basket}>Перейти в корзину</Link>
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
