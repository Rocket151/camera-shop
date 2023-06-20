import BreadCrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ProductTabs from '../../components/product-tabs/product-tabs';
import SimilarCamerasList from '../../components/similar-camera-list/similar-camera-list';
import { useAppSelector } from '../../hooks';
import { getProductData } from '../../store/product-data/selectors';
import NotFoundScreen from '../not-found-screen/not-found-screen';

export default function ProductScreen(): JSX.Element {
  const productData = useAppSelector(getProductData);

  if (productData) {
    const {name, price, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, reviewCount} = productData;
    return (
      <div className="wrapper">

        <Header />
        <main>
          <div className="page-content">
            <BreadCrumbs />
            <div className="page-content__section">
              <section className="product">
                <div className="container">
                  <div className="product__img">
                    <picture>
                      <source type="image/webp" srcSet={`../${previewImgWebp}, ../${previewImgWebp2x}`} />
                      <img src={`../${previewImg}`} srcSet={`../${previewImg2x}`} width="560" height="480" alt={name} />
                    </picture>
                  </div>
                  <div className="product__content">
                    <h1 className="title title--h3">{name}</h1>
                    <div className="rate product__rate">
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-full-star"></use>
                      </svg>
                      <svg width="17" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg>
                      <p className="visually-hidden">Рейтинг: 4</p>
                      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
                    </div>
                    <p className="product__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
                    <button className="btn btn--purple" type="button">
                      <svg width="24" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-add-basket"></use>
                      </svg>Добавить в корзину
                    </button>

                    <ProductTabs />
                  </div>
                </div>
              </section>
            </div>
            <div className="page-content__section">

              <SimilarCamerasList />
            </div>
            <div className="page-content__section">
              <section className="review-block">
                <div className="container">
                  <div className="page-content__headed">
                    <h2 className="title title--h3">Отзывы</h2>
                    <button className="btn" type="button">Оставить свой отзыв</button>
                  </div>
                  <ul className="review-block__list">
                    <li className="review-card">
                      <div className="review-card__head">
                        <p className="title title--h4">Сергей Горский</p>
                        <time className="review-card__data" dateTime="2022-04-13">13 апреля</time>
                      </div>
                      <div className="rate review-card__rate">
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-full-star"></use>
                        </svg>
                        <p className="visually-hidden">Оценка: 5</p>
                      </div>
                      <ul className="review-card__list">
                        <li className="item-list"><span className="item-list__title">Достоинства:</span>
                          <p className="item-list__text">Надёжная, хорошо лежит в руке, необычно выглядит</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">Недостатки:</span>
                          <p className="item-list__text">Тяжеловата, сложно найти плёнку</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">Комментарий:</span>
                          <p className="item-list__text">Раз в полгода достаю из-под стекла, стираю пыль, заряжаю — работает как часы. Ни у кого из знакомых такой нет, все завидуют) Теперь это жемчужина моей коллекции, однозначно стоит своих денег!</p>
                        </li>
                      </ul>
                    </li>
                    <li className="review-card">
                      <div className="review-card__head">
                        <p className="title title--h4">Пётр Матросов</p>
                        <time className="review-card__data" dateTime="2022-03-02">2 марта</time>
                      </div>
                      <div className="rate review-card__rate">
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                        <p className="visually-hidden">Оценка: 1</p>
                      </div>
                      <ul className="review-card__list">
                        <li className="item-list"><span className="item-list__title">Достоинства:</span>
                          <p className="item-list__text">Хорошее пресс-папье</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">Недостатки:</span>
                          <p className="item-list__text">Через 3 дня развалилась на куски</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">Комментарий:</span>
                          <p className="item-list__text">При попытке вставить плёнку сломался механизм открытия отсека, пришлось заклеить его изолентой. Начал настраивать фокус&nbsp;— линза провалилась внутрь корпуса. Пока доставал — отломилось несколько лепестков диафрагмы. От злости стукнул камеру об стол, и рукоятка треснула пополам. Склеил всё суперклеем, теперь прижимаю ей бумагу. НЕ РЕКОМЕНДУЮ!!!</p>
                        </li>
                      </ul>
                    </li>
                    <li className="review-card">
                      <div className="review-card__head">
                        <p className="title title--h4">Татьяна Кузнецова </p>
                        <time className="review-card__data" dateTime="2021-12-30">30 декабря</time>
                      </div>
                      <div className="rate review-card__rate">
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-full-star"></use>
                        </svg>
                        <svg width="17" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-star"></use>
                        </svg>
                        <p className="visually-hidden">Оценка: 4</p>
                      </div>
                      <ul className="review-card__list">
                        <li className="item-list"><span className="item-list__title">Достоинства:</span>
                          <p className="item-list__text">Редкая</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">Недостатки:</span>
                          <p className="item-list__text">Высокая цена</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">Комментарий:</span>
                          <p className="item-list__text">Дорого для портативной видеокамеры, но в моей коллекции как раз не хватало такого экземпляра. Следов использования нет, доставили в заводской упаковке, выглядит шикарно!</p>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <div className="review-block__buttons">
                    <button className="btn btn--purple" type="button">Показать больше отзывов
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
        <a className="up-btn" href="#header">
          <svg width="12" height="18" aria-hidden="true">
            <use xlinkHref="#icon-arrow2"></use>
          </svg>
        </a>
        <Footer />
      </div>
    );
  }
  return <NotFoundScreen />;
}
