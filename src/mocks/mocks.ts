import { datatype, commerce, image, internet, lorem } from 'faker';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { CamerasData } from '../types/cameras-data';
import { PromoData } from '../types/promo-data';
import { ReviewData } from '../types/review-data';
import { UserReviewData } from '../types/user-review-data';
import { createAPI } from '../services/services';
import { State } from '../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { SlicesNames } from '../const';
import { initialCamerasDataState } from '../store/cameras-data/cameras-data';
import { initialProductDataState } from '../store/product-data/product-data';
import { initialPromoDataState } from '../store/promo-data/promo-data';
import { initialBasketDataState } from '../store/basket-data/basket-data';
import { initialSimilarCamerasDataState } from '../store/similar-cameras-data/similar-cameras-data';
import { BasketCamerasData } from '../types/basket-cameras-data';

export const makeFakeReview = (): ReviewData => ({
  id: datatype.string(),
  userName: internet.userName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  review: lorem.paragraph(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.01 }),
  cameraId: datatype.number(),
  createAt: datatype.string(),
});
export const fakeReviews = Array.from({length: 15}, makeFakeReview);
export const fakeReview = fakeReviews[1];

export const makeFakeCamera = (): CamerasData => ({
  id: datatype.number(),
  name: commerce.productName(),
  vendorCode: datatype.string(),
  type: commerce.product(),
  category: datatype.string(),
  description: lorem.paragraph(),
  level: datatype.string(),
  price: datatype.number(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
  reviewCount: datatype.number(),
  rating: datatype.number(),
});

export const makeFakeBasketCamera = (): BasketCamerasData => ({
  id: datatype.number(),
  name: commerce.productName(),
  vendorCode: datatype.string(),
  type: commerce.product(),
  category: datatype.string(),
  description: lorem.paragraph(),
  level: datatype.string(),
  price: datatype.number(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
  reviewCount: datatype.number(),
  rating: datatype.number(),
  basketItemCount: datatype.number(),
});

export const fakeCameras = Array.from({length: 20}, makeFakeCamera);
export const fakeCamera = fakeCameras[0];

export const basketFakeCameras = Array.from({length: 20}, makeFakeBasketCamera);
export const basketFakeCamera = basketFakeCameras[0];

export const makeFakePromo = (): PromoData => ({
  id: datatype.number(),
  name: commerce.productName(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
});

export const fakePromo = makeFakePromo();

export const makeFakeUserReview = (): UserReviewData => ({
  userName: internet.userName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.01 }),
  review: lorem.paragraph(),
  cameraId: datatype.number(),
});

export const fakeUserReview = makeFakeUserReview();

export const api = createAPI();
export const mockApi = new MockAdapter(api);
export const middlewares = [thunk.withExtraArgument(api)];

export const getMockStore = configureMockStore<
State,
Action<string>,
ThunkDispatch<State, typeof api, Action>
>(middlewares);


export const fakeId = '4';
export const fakeCurrentPage = 1;
export const UNKNOWN_ACTION = {type: 'UNKNOWN_ACTION'};

export const makeMockState = () => ({
  [SlicesNames.CamerasData]: {
    ...initialCamerasDataState,
  },
  [SlicesNames.BasketData]: {
    ...initialBasketDataState,
  },
  [SlicesNames.ProductData]: {
    ...initialProductDataState,
  },
  [SlicesNames.PromoData]: {
    ...initialPromoDataState,
  },
  [SlicesNames.SimilarCamerasData]: {
    ...initialSimilarCamerasDataState,
  },
});

export const mockState = makeMockState();
export const mockStore = getMockStore(mockState);
