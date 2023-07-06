import { MouseEventHandler, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeSuccessSendingReviewStatus } from '../../store/reviews-data/reviews-data';
import { getSendingReviewStatus } from '../../store/reviews-data/selectors';
import Modal from '../modal/modal';

type ModalAddReviewSuccessProps = {
  setModalAddReviewSuccess: (arg:boolean) => void;
  isModalAddReviewSuccess: boolean;
}

export default function ModalAddReviewSuccess({setModalAddReviewSuccess, isModalAddReviewSuccess}: ModalAddReviewSuccessProps): JSX.Element {
  const isReviewSendingStatusSuccess = useAppSelector(getSendingReviewStatus);
  const dispatch = useAppDispatch();

  const handleModalCloseOnOverlay: MouseEventHandler<HTMLDivElement> = (evt) => {
    if (evt.target === evt.currentTarget) {
      setModalAddReviewSuccess(false);
      document.body.style.overflowY = '';
      dispatch(changeSuccessSendingReviewStatus(false));
    }
  };

  const handleModalClose = () => {
    setModalAddReviewSuccess(false);
    document.body.style.overflowY = '';
    dispatch(changeSuccessSendingReviewStatus(false));
  };

  useEffect(() => {
    if(isReviewSendingStatusSuccess) {
      setModalAddReviewSuccess(true);
      document.body.style.overflowY = 'hidden';
    }
  }, [isReviewSendingStatusSuccess, setModalAddReviewSuccess]);

  return (
    <Modal onClose={handleModalClose}>
      <div className={`modal ${isModalAddReviewSuccess ? 'is-active' : ''}`} data-testid="add-review-success">
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleModalCloseOnOverlay}></div>
          <div className="modal__content">
            <p className="title title--h4">Спасибо за отзыв</p>
            <svg className="modal__icon" width="80" height="78" aria-hidden="true">
              <use xlinkHref="#icon-review-success"></use>
            </svg>
            <div className="modal__buttons">
              <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleModalClose}>Вернуться к покупкам
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
