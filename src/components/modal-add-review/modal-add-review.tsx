import { FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { sendUserReviewAction } from '../../store/api-actions';
import { CamerasData } from '../../types/cameras-data';
import Modal from '../modal/modal';

type ModalAddItemProps = {
  setModalAddReview: (arg:boolean) => void;
  isModalAddReview: boolean;
  productData: CamerasData;
  setModalAddReviewSuccess: (arg:boolean) => void;
}

const initialState = {
  userName: '',
  advantage: '',
  disadvantage: '',
  review: '',
  rating: 0,
  }

export default function ModalAddReview({setModalAddReview, isModalAddReview, productData, setModalAddReviewSuccess}: ModalAddItemProps): JSX.Element {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useAppDispatch();

  const handleFormFieldChange = (evt: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>): void => {
    const {name, value} = evt.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const resetFormData = (): void => {
    setFormData(initialState)
  }
  const handleSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    dispatch(sendUserReviewAction({
      resetFormData, 
      handleModalUserReviewClose, 
      handleModalUserReviewSuccessOpen,
      formData:
      {
        ...formData,
        rating: +formData.rating,
        cameraId: productData.id,
      }, 
    
    }));
  };
  const handleModalUserReviewSuccessOpen = () => {
    setModalAddReviewSuccess(true);
    document.body.style.overflowY = 'hidden';
  };
  const handleModalUserReviewClose = () => {
    setModalAddReview(false);
    document.body.style.overflowY = '';
  };

  return (
    <Modal onClose={handleModalUserReviewClose}>
      <div className={`modal ${isModalAddReview ? 'is-active' : ''}`}>
        <div className="modal__wrapper">
          <div className="modal__overlay"></div>
          <div className="modal__content">
            <p className="title title--h4">Оставить отзыв</p>
            <div className="form-review">
              <form method="post" onSubmit={handleSubmit}>
                <div className="form-review__rate">
                  <fieldset className="rate form-review__item">
                    <legend className="rate__caption">Рейтинг
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </legend>
                    <div className="rate__bar">
                      <div className="rate__group">
                        <input className="visually-hidden" id="star-5" name="rating" type="radio" value='5' onChange={handleFormFieldChange} />
                        <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                        <input className="visually-hidden" id="star-4" name="rating" type="radio" value='4' onChange={handleFormFieldChange} />
                        <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                        <input className="visually-hidden" id="star-3" name="rating" type="radio" value='3' onChange={handleFormFieldChange} />
                        <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                        <input className="visually-hidden" id="star-2" name="rating" type="radio" value='2' onChange={handleFormFieldChange} />
                        <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                        <input className="visually-hidden" id="star-1" name="rating" type="radio" value='1' onChange={handleFormFieldChange} />
                        <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                      </div>
                      <div className="rate__progress"><span className="rate__stars">{formData.rating}</span> <span>/</span> <span className="rate__all-stars">5</span>
                      </div>
                    </div>
                    <p className="rate__message">Нужно оценить товар</p>
                  </fieldset>
                  <div className="custom-input form-review__item">
                    <label>
                      <span className="custom-input__label">Ваше имя
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input type="text" name="userName" placeholder="Введите ваше имя" value={formData.userName} required onChange={handleFormFieldChange} />
                    </label>
                    <p className="custom-input__error">Нужно указать имя</p>
                  </div>
                  <div className="custom-input form-review__item">
                    <label>
                      <span className="custom-input__label">Достоинства
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input type="text" name="advantage" placeholder="Основные преимущества товара" value={formData.advantage} required onChange={handleFormFieldChange} />
                    </label>
                    <p className="custom-input__error">Нужно указать достоинства</p>
                  </div>
                  <div className="custom-input form-review__item">
                    <label>
                      <span className="custom-input__label">Недостатки
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <input type="text" name="disadvantage" placeholder="Главные недостатки товара" value={formData.disadvantage} required onChange={handleFormFieldChange} />
                    </label>
                    <p className="custom-input__error">Нужно указать недостатки</p>
                  </div>
                  <div className="custom-textarea form-review__item">
                    <label>
                      <span className="custom-textarea__label">Комментарий
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlinkHref="#icon-snowflake"></use>
                        </svg>
                      </span>
                      <textarea name="review" minLength={5} placeholder="Поделитесь своим опытом покупки" value={formData.review} onChange={handleFormFieldChange}></textarea>
                    </label>
                    <div className="custom-textarea__error">Нужно добавить комментарий</div>
                  </div>
                </div>
                <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
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
