import { store } from '../store';
import { CamerasData } from './cameras-data';
import { PromoData } from './promo-data';

export type CamerasDataState = {
  isCamerasDataLoading: boolean;
  camerasData: CamerasData[];
}

export type PromoDataState = {
  isPromoDataLoading: boolean;
  promoData: PromoData | null;
}

export type ProductDataState = {
  isProductDataLoading: boolean;
  productData: CamerasData | null;
}

export type SimilarCamerasDataState = {
  isSimilarCamerasDataLoading: boolean;
  similarCamerasData: CamerasData[];
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
