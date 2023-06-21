import Modal from '../modal/modal';

type ModalAddItemProps = {
  setModalAddReview: (arg:boolean) => void;
  isModalAddReview: boolean;
}

export default function ModalAddReview({setModalAddReview, isModalAddReview}: ModalAddItemProps): JSX.Element {

  const handleModalClose = () => {
    setModalAddReview(false);
    document.body.style.overflowY = '';
  };

  return (
    <Modal onClose={handleModalClose}>
      <div className={`modal ${isModalAddReview ? 'is-active' : ''}`}>
        <div className="modal__wrapper">
          <div className="modal__overlay"></div>
          <div className="modal__content">
              <p class="title title--h4">Оставить отзыв</p>
              <div class="form-review">
                <form method="post">
                  <div class="form-review__rate">
                    <fieldset class="rate form-review__item">
                      <legend class="rate__caption">Рейтинг
                        <svg width="9" height="9" aria-hidden="true">
                          <use xlink:href="#icon-snowflake"></use>
                        </svg>
                      </legend>
                      <div class="rate__bar">
                        <div class="rate__group">
                          <input class="visually-hidden" id="star-5" name="rate" type="radio" value="5">
                          <label class="rate__label" for="star-5" title="Отлично"></label>
                          <input class="visually-hidden" id="star-4" name="rate" type="radio" value="4">
                          <label class="rate__label" for="star-4" title="Хорошо"></label>
                          <input class="visually-hidden" id="star-3" name="rate" type="radio" value="3">
                          <label class="rate__label" for="star-3" title="Нормально"></label>
                          <input class="visually-hidden" id="star-2" name="rate" type="radio" value="2">
                          <label class="rate__label" for="star-2" title="Плохо"></label>
                          <input class="visually-hidden" id="star-1" name="rate" type="radio" value="1">
                          <label class="rate__label" for="star-1" title="Ужасно"></label>
                        </div>
                        <div class="rate__progress"><span class="rate__stars">0</span> <span>/</span> <span class="rate__all-stars">5</span>
                        </div>
                      </div>
                      <p class="rate__message">Нужно оценить товар</p>
                    </fieldset>
                    <div class="custom-input form-review__item">
                      <label><span class="custom-input__label">Ваше имя
                          <svg width="9" height="9" aria-hidden="true">
                            <use xlink:href="#icon-snowflake"></use>
                          </svg></span>
                        <input type="text" name="user-name" placeholder="Введите ваше имя" required>
                      </label>
                      <p class="custom-input__error">Нужно указать имя</p>
                    </div>
                    <div class="custom-input form-review__item">
                      <label><span class="custom-input__label">Достоинства
                          <svg width="9" height="9" aria-hidden="true">
                            <use xlink:href="#icon-snowflake"></use>
                          </svg></span>
                        <input type="text" name="user-plus" placeholder="Основные преимущества товара" required>
                      </label>
                      <p class="custom-input__error">Нужно указать достоинства</p>
                    </div>
                    <div class="custom-input form-review__item">
                      <label><span class="custom-input__label">Недостатки
                          <svg width="9" height="9" aria-hidden="true">
                            <use xlink:href="#icon-snowflake"></use>
                          </svg></span>
                        <input type="text" name="user-minus" placeholder="Главные недостатки товара" required>
                      </label>
                      <p class="custom-input__error">Нужно указать недостатки</p>
                    </div>
                    <div class="custom-textarea form-review__item">
                      <label><span class="custom-textarea__label">Комментарий
                          <svg width="9" height="9" aria-hidden="true">
                            <use xlink:href="#icon-snowflake"></use>
                          </svg></span>
                        <textarea name="user-comment" minlength="5" placeholder="Поделитесь своим опытом покупки"></textarea>
                      </label>
                      <div class="custom-textarea__error">Нужно добавить комментарий</div>
                    </div>
                  </div>
                  <button class="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
                </form>
              </div>
              <button class="cross-btn" type="button" aria-label="Закрыть попап">
                <svg width="10" height="10" aria-hidden="true">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </button>
          </div>    </div>
            </
    </odal>
  );
}
