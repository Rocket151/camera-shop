import { fakeCamera, UNKNOWN_ACTION } from '../../mocks/mocks';
import { fetchProductDataAction } from '../api-actions';
import { initialProductDataState, productData } from './product-data';

describe('Reducer: productData', () => {

  it('without additional parameters should return initial state', () => {
    expect(productData.reducer(undefined, UNKNOWN_ACTION))
      .toEqual(initialProductDataState);
  });
  it('should update productData if fetchProductDataAction fulfilled', () => {
    expect(productData.reducer(initialProductDataState, {type: fetchProductDataAction.fulfilled.type, payload: fakeCamera}))
      .toEqual({...initialProductDataState, productData: fakeCamera, isProductDataLoading: false });
  });
  it('should change isProductDataLoading to true if productData loading', () => {
    expect(productData.reducer(initialProductDataState, {type: fetchProductDataAction.pending.type}))
      .toEqual({...initialProductDataState, isProductDataLoading: true});
  });
});
