import { store } from '../store';
import { CamerasData } from './cameras-data';
import { PromoData } from './promo-data';
import { ReviewData } from './review-data';

export type CamerasDataState = {
  isCamerasDataLoading: boolean;
  camerasData: CamerasData[];
  selectedCameraData: CamerasData;
  filteredCamerasData: CamerasData[],
  currentSortType: string,
  currentSortOrder: string,
  isReviewsDataLoading: boolean;
  productReviewsData: ReviewData[];
  isSuccessReviewSending: boolean;
  minPrice: number;
  maxPrice: number;
}

export type PromoDataState = {
  isPromoDataLoading: boolean;
  promoData: PromoData | null;
}

export type ProductDataState = {
  isProductDataLoading: boolean;
  productData: CamerasData;
}

export type SimilarCamerasDataState = {
  isSimilarCamerasDataLoading: boolean;
  similarCamerasData: CamerasData[];
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
