import { store } from '../store';
import { CamerasData } from './cameras-data';
import { PromoData } from './promo-data';
import { ReviewData } from './review-data';

export type CamerasDataState = {
  isCamerasDataLoading: boolean;
  camerasData: CamerasData[];
  selectedCameraData: CamerasData;
}

export type PromoDataState = {
  isPromoDataLoading: boolean;
  promoData: PromoData | null;
}
export type ReviewsDataState = {
  isReviewsDataLoading: boolean;
  reviewsData: ReviewData[];
  isSuccessReviewSending: boolean;
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
