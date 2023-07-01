export enum AppRoute {
    Root = '/',
    Product = '/product/',
    Basket = '/basket',

}

export enum SlicesNames {
  CamerasData = 'CAMERAS_DATA',
  PromoData = 'PROMO_DATA',
  ProductData = 'PRODUCT_DATA',
  SimilarCamerasData = 'SIMILAR_CAMERAS_DATA',
  ReviewsData = 'REVIEWS_DATA',
}

export enum APIRoute {
  Cameras = '/cameras/',
  Promo = '/promo',
  SimilarCameras = '/similar',
  Reviews = '/reviews'
}

export enum TabNames {
  Characteristics = 'Характеристики',
  Description = 'Описание',
}

export enum ScreenNames {
  Catalog = 'Catalog',
  Product = 'Product',
}


type ReviewInput = {
  name: string;
  title: string;
  placeholder: string;
  errorText: string;
}

export enum InputName {
  Name = 'userName',
  Advantage = 'advantage',
  Disadvantage = 'disadvantage',
  Review = 'review',
  Rating = 'rating',
}

export enum InputTitle {
  Name = 'Ваше имя',
  Advantage = 'Достоинства',
  Disadvantage ='Недостатки',
  Review = 'Комментарий',
  Rating = 'Рейтинг'
}

export enum InputPlaceholder {
  Name = 'Введите ваше имя',
  Advantage = 'Основные преимущества товара',
  Disadvantage = 'Главные недостатки товара',
  Review = 'Поделитесь своим опытом покупки',
}

export const CAROUSEL_VISIBLE_CLASS = 'is-active';

export const MAX_CAROUSEL_ITEMS = 3;

export const MAX_PRODUCTS_PAGE = 9;

export const MIN_SLIDER_ITEM_INDEX = 0;
