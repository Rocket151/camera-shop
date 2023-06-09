import {combineReducers} from '@reduxjs/toolkit';
import { SlicesNames } from '../const';
import { camerasData } from './cameras-data/cameras-data';
import { productData } from './product-data/product-data';
import { promoData } from './promo-data/promo-data';

export const rootReducer = combineReducers({
  [SlicesNames.CamerasData]: camerasData.reducer,
  [SlicesNames.PromoData]: promoData.reducer,
  [SlicesNames.ProductData]: productData.reducer,
});
