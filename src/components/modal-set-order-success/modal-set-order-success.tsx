import { MouseEventHandler, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Modal from '../modal/modal';
import FocusLock from 'react-focus-lock';
import { getOrderStatus } from '../../store/basket-data/selectors';
import { AppRoute } from '../../const';
import { clearBasket, resetOrderStatus } from '../../store/basket-data/basket-data';
import { Link } from 'react-router-dom';


type ModalSetOrderSuccessProps = {
  setModalSetOrderSuccess: (arg:boolean) => void;
  isModalSetOrderSuccess: boolean;
}

export default function ModalSetOrderSuccess({setModalSetOrderSuccess, isModalSetOrderSuccess}: ModalSetOrderSuccessProps): JSX.Element {
  const isOrderHasPlaced = useAppSelector(getOrderStatus);
  const dispatch = useAppDispatch();

  const handleModalCloseOnOverlay: MouseEventHandler<HTMLDivElement> = (evt) => {
    if (evt.target === evt.currentTarget) {
      setModalSetOrderSuccess(false);
      document.body.style.overflowY = '';
      dispatch(resetOrderStatus());
    }
  };

  const handleModalClose = () => {
    setModalSetOrderSuccess(false);
    document.body.style.overflowY = '';
    dispatch(resetOrderStatus());
  };

  useEffect(() => {
    if(isOrderHasPlaced) {
      setModalSetOrderSuccess(true);
      document.body.style.overflowY = 'hidden';
      dispatch(clearBasket());
    }
  }, [isOrderHasPlaced, setModalSetOrderSuccess, dispatch]);

  return (
    <FocusLock disabled={!isModalSetOrderSuccess}>
      <Modal onClose={handleModalClose}>
        <div className={`modal ${isModalSetOrderSuccess ? 'is-active' : ''}`} data-testid="modal-set-order-success">
          <div className="modal__wrapper">
            <div className="modal__overlay" onClick={handleModalCloseOnOverlay}></div>
            <div className="modal__content">
              <p className="title title--h4">Спасибо за покупку</p>
              <svg className="modal__icon" width="80" height="78" aria-hidden="true">
                <use xlinkHref="#icon-review-success"></use>
              </svg>
              <div className="modal__buttons">
                <Link className="btn btn--purple modal__btn modal__btn--fit-width" to={AppRoute.Root} onClick={handleModalClose}>Вернуться к покупкам
                </Link>
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
