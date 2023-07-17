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

export function calculateRating(reviews: ReviewData[], id: number) {
  const filteredReviews = reviews.filter((review) => review.cameraId === id);

  let reviewsRating = 0;

  filteredReviews.forEach((review) => {
    reviewsRating += review.rating;
  });

  return Math.round(reviewsRating / filteredReviews.length);

}

export const humanizePrice = (value: number) => value ? value.toLocaleString() : 0;

export const humanizeReviewDate = (date: Date, locales = 'ru-RU') => date.toLocaleString(locales, {day: 'numeric', month: 'long'});
