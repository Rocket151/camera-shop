import { fakeCamera, UNKNOWN_ACTION } from '../../mocks/mocks';
import { initialPromoDataState, promoData } from './promo-data';

describe('Reducer: promoData', () => {

  it('without additional parameters should return initial state', () => {
    expect(promoData.reducer(undefined, UNKNOWN_ACTION))
      .toEqual(initialPromoDataState);
  });
  it('should update promoData if fetchPromoDataAction fulfilled', () => {
    expect(promoData.reducer(initialPromoDataState, {type: fetchPromoDataAction.fulfilled.type, payload: fakeCamera}))
      .toEqual({...initialProductDataState, camerasData: fakeCamera, isProductDataLoading: false });
  });
  it('should change isProductDataLoading to true if productData loading', () => {
    expect(productData.reducer(initialProductDataState, {type: fetchProductDataAction.pending.type}))
      .toEqual({...initialProductDataState, isProductDataLoading: true});
  });
});