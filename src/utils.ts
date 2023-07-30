import { MAX_PRODUCTS_PAGE } from './const';
import { CamerasData } from './types/cameras-data';
import { ReviewData } from './types/review-data';
import dayjs from 'dayjs';

export function getPagesNumber(data: CamerasData[]) {
  const pagesCount = Math.ceil(data.length / MAX_PRODUCTS_PAGE);
  const totalPages = [];
  for(let i = 0; i < pagesCount; i++) {
    totalPages.push(i + 1);
  }
  return totalPages;
}

export function sortReviewsDateDown(reviewA: ReviewData, reviewB: ReviewData) {
  return dayjs(reviewB.createAt).diff(dayjs(reviewA.createAt));
}

export function sortCamerasDataByPriceDown(cameraA: CamerasData, cameraB: CamerasData) {
  return cameraB.price - cameraA.price;
}

export function sortCamerasDataByPriceUp(cameraA: CamerasData, cameraB: CamerasData) {
  return cameraA.price - cameraB.price;
}

export function sortCamerasDataByPopularDown(cameraA: CamerasData, cameraB: CamerasData) {
  return cameraB.rating - cameraA.rating;
}

export function sortCamerasDataByPopularUp(cameraA: CamerasData, cameraB: CamerasData) {
  return cameraA.rating - cameraB.rating;
}

export function calculateRating(reviews: ReviewData[], id: number) {
  const filteredReviews = reviews.filter((review) => review.cameraId === id);

  let reviewsRating = 0;

  filteredReviews.forEach((review) => {
    reviewsRating += review.rating;
  });

  return Math.round(reviewsRating / filteredReviews.length);

}

export function calculateRatingOnProductScreen(reviews: ReviewData[]) {
  let reviewsRating = 0;

  reviews.forEach((review) => {
    reviewsRating += review.rating;
  });

  return Math.round(reviewsRating / reviews.length);

}

export const filterByIsVideocamera = (flag: boolean, data: CamerasData) => {
  return !flag || data.category === 'Видеокамера';
}

export const filterByIsPhotocamera = (flag: boolean, data: CamerasData) => {
  return !flag || data.category === 'Фотоаппарат';
}

export const filterByСameraIsCollection = (flag: boolean, data: CamerasData) => {
  return !flag || data.type === 'Коллекционная';
}

export const filterByСameraIsSnapshot = (flag: boolean, data: CamerasData) => {
  return !flag || data.type === 'Моментальная';
}

export const filterByСameraIsDigital = (flag: boolean, data: CamerasData) => {
  return !flag || data.type === 'Цифровая';
}

export const filterByСameraIsFilm = (flag: boolean, data: CamerasData) => {
  return !flag || data.type === 'Плёночная';
}

export const filterByСameraIsZeroLevel = (flag: boolean, data: CamerasData) => {
  return !flag || data.level === 'Нулевой';
}

export const filterByСameraIsNonProfessional = (flag: boolean, data: CamerasData) => {
  return !flag || data.level === 'Любительский';
}

export const filterByСameraIsProfessional = (flag: boolean, data: CamerasData) => {
  return !flag || data.level === 'Профессиональный';
}

export const humanizePrice = (value: number) => value ? value.toLocaleString() : 0;

export const humanizeReviewDate = (date: Date, locales = 'ru-RU') => date.toLocaleString(locales, {day: 'numeric', month: 'long'});
