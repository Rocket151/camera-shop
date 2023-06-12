import { MAX_PRODUCTS_PAGE } from './const';
import { CamerasData } from './types/cameras-data';

export function getPagesNumber(data: CamerasData[]) {
  const pagesCount = Math.ceil(data.length / MAX_PRODUCTS_PAGE);
  const totalPages = [];
  for(let i = 0; i < pagesCount; i++) {
    totalPages.push(i + 1);
  }
  return totalPages;
}
