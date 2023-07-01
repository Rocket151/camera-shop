import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendUserReviewAction } from '../../store/api-actions';
import { CamerasData } from '../../types/cameras-data';
import Modal from '../modal/modal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import { getSendingReviewStatus } from '../../store/reviews-data/selectors';

type ModalAddItemProps = {
  setModalAddReview: (arg:boolean) => void;
  isModalAddReview: boolean;
  productData: CamerasData;
}

type FormData = {
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

export default function ModalAddReview({setModalAddReview, isModalAddReview, productData}: ModalAddItemProps): JSX.Element {
  const isReviewSendingStatusSuccess = useAppSelector(getSendingReviewStatus);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const handleModalUserReviewClose = () => {
    setModalAddReview(false);
    document.body.style.overflowY = '';
  };

  useEffect(() => {
    if(isReviewSendingStatusSuccess) {
      setModalAddReview(false);
      reset();
    }
  }, [isReviewSendingStatusSuccess, reset]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(sendUserReviewAction({
      formData:
      {
        ...data,
        rating: +data.rating,
        cameraId: productData.id,
      },
    }));
  };

  return (
    <Modal onClose={handleModalUserReviewClose}>
      <div className={`modal ${isModalAddReview ? 'is-active' : ''}`} data-testid="review">
        <div className="modal__wrapper">
          <div className="modal__overlay"></div>
          <div className="modal__content">
            <p className="title title--h4">Оставить отзыв</p>
            <div className="form-review">
              <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-review__rate">
                  <fieldset className={`rate form-review__item ${errors.rating ? 'is-invalid' : ''}`}>
                    <legend className="rate__caption">Рейтинг
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </legend>
                    <div className="rate__bar">
                      <div className="rate__group">
                        <input className="visually-hidden" id="star-5" {...register('rating')} type="radio" value='5' />
                        <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                        <input className="visually-hidden" id="star-4" {...register('rating')} type="radio" value='4' />
                        <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                        <input className="visually-hidden" id="star-3" {...register('rating')} type="radio" value='3' />
                        <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                        <input className="visually-hidden" id="star-2" {...register('rating')} type="radio" value='2' />
                        <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                        <input className="visually-hidden" id="star-1" {...register('rating', { required: true})} type="radio" value='1' />
                        <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                      </div>
                      <div className="rate__progress"><span className="rate__stars">{watch('rating') || '0'}</span> <span>/</span> <span className="rate__all-stars">5</span>
                      </div>
                    </div>
                    <p className="rate__message">Нужно оценить товар</p>
                  </fieldset>
                  <div className={`custom-input form-review__item ${errors.userName ? 'is-invalid' : ''}`}>
                    <label>
                      <span className="custom-input__label">Ваше имя
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input type="text" {...register('userName', { required: true, minLength: 2, maxLength: 10})} placeholder="Введите ваше имя" required />
                    </label>
                    <p className="custom-input__error">Нужно указать имя</p>
                  </div>
                  <div className={`custom-input form-review__item ${errors.advantage ? 'is-invalid' : ''}`}>
                    <label>
                      <span className="custom-input__label">Достоинства
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input type="text" {...register('advantage', { required: true, minLength: 5, maxLength: 50})} placeholder="Основные преимущества товара" />
                    </label>
                    <p className="custom-input__error">Нужно указать достоинства</p>
                  </div>
                  <div className={`custom-input form-review__item  ${errors.disadvantage ? 'is-invalid' : ''}`}>
                    <label>
                      <span className="custom-input__label">Недостатки
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input type="text" {...register('disadvantage', { required: true, minLength: 5, maxLength: 50})} placeholder="Главные недостатки товара" />
                    </label>
                    <p className="custom-input__error">Нужно указать недостатки</p>
                  </div>
                  <div className={`custom-textarea form-review__item  ${errors.review ? 'is-invalid' : ''}`}>
                    <label>
                      <span className="custom-textarea__label">Комментарий
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <textarea {...register('review', { required: true, minLength: 5, maxLength: 50})} placeholder="Поделитесь своим опытом покупки" ></textarea>
                    </label>
                    <div className="custom-textarea__error">Нужно добавить комментарий</div>
                  </div>
                </div>
                <button className="btn btn--purple form-review__btn" aria-label="Отправить отзыв" type="submit">Отправить отзыв</button>
              </form>
            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={handleModalUserReviewClose}>
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
