import { fakeCamera, UNKNOWN_ACTION } from '../../mocks/mocks';
import { fetchPromoDataAction } from '../api-actions';
import { initialPromoDataState, promoData } from './promo-data';

describe('Reducer: promoData', () => {

  it('without additional parameters should return initial state', () => {
    expect(promoData.reducer(undefined, UNKNOWN_ACTION))
      .toEqual(initialPromoDataState);
  });
  it('should update promoData if fetchPromoDataAction fulfilled', () => {
    expect(promoData.reducer(initialPromoDataState, {type: fetchPromoDataAction.fulfilled.type, payload: fakeCamera}))
      .toEqual({...initialPromoDataState, promoData: fakeCamera, isPromoDataLoading: false });
  });
  it('should change isPromoDataLoading to true if promoData loading', () => {
    expect(promoData.reducer(initialPromoDataState, {type: fetchPromoDataAction.pending.type}))
      .toEqual({...initialPromoDataState, isPromoDataLoading: true});
  });
});
