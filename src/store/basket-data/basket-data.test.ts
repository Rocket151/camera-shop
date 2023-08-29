import { fakeCameras, UNKNOWN_ACTION, basketFakeCameras } from '../../mocks/mocks';
import { checkCouponAction, setOrderAction } from '../api-actions';
import { basketData, initialBasketDataState, addToBasket, setItemToRemoveFromBasket, changeBasketItemCount, deleteBasketItem, resetCouponDiscount, resetOrderStatus, clearBasket } from './basket-data';
import { CouponStatus } from '../../const';

describe('Reducer: basketData', () => {

  it('without additional parameters should return initial state', () => {
    expect(basketData.reducer(undefined, UNKNOWN_ACTION))
      .toEqual(initialBasketDataState);
  });

  it('should update basketData if checkCouponAction fulfilled', () => {
    const fakeDiscount = '15';
    expect(basketData.reducer(initialBasketDataState, {type: checkCouponAction.fulfilled.type, payload: fakeDiscount}))
      .toEqual({...initialBasketDataState, couponDiscount: fakeDiscount});
  });

  it('should update basketData if checkCouponAction rejected', () => {
    expect(basketData.reducer(initialBasketDataState, {type: checkCouponAction.rejected.type}))
      .toEqual({...initialBasketDataState, couponDiscount: CouponStatus.InvalidCoupon});
  });

  it('should change orderHasPlaced to true if setOrderAction fulfilled', () => {
    expect(basketData.reducer(initialBasketDataState, {type: setOrderAction.fulfilled.type}))
      .toEqual({...initialBasketDataState, orderHasPlaced: true});
  });

  it('should change orderHasPlaced to false if setOrderAction rejected', () => {
    expect(basketData.reducer(initialBasketDataState, {type: setOrderAction.rejected.type}))
      .toEqual({...initialBasketDataState, orderHasPlaced: false});
  });

  it('should update basketCamerasData on addToBasket', () => {
    expect(basketData.reducer(initialBasketDataState, addToBasket(fakeCameras[0])))
      .toEqual({...initialBasketDataState, basketCamerasData: [{...fakeCameras[0], basketItemCount: 1}]});
  });

  it('should update basketItemCount property in basketCameraData on changeBasketItemCount', () => {
    expect(basketData.reducer({...initialBasketDataState, basketCamerasData: [basketFakeCameras[0]]}, changeBasketItemCount(basketFakeCameras[0])))
      .toEqual({...initialBasketDataState, basketCamerasData: [{...basketFakeCameras[0], basketItemCount: basketFakeCameras[0].basketItemCount}]});
  });

  it('should update itemToRemoveFromBasket on setItemToRemoveFromBasket', () => {
    expect(basketData.reducer(initialBasketDataState, setItemToRemoveFromBasket(basketFakeCameras[0])))
      .toEqual({...initialBasketDataState, itemToRemoveFromBasket: basketFakeCameras[0]});
  });

  it('should remove basket item from basketCamerasData on deleteBasketItem', () => {
    const fakeBasketCameras = [...basketFakeCameras];

    fakeBasketCameras.shift();

    expect(basketData.reducer({...initialBasketDataState, basketCamerasData: basketFakeCameras}, deleteBasketItem(basketFakeCameras[0].id)))
      .toEqual({...initialBasketDataState, basketCamerasData: fakeBasketCameras});
  });

  it('should update couponDiscount on resetCouponDiscount', () => {
    expect(basketData.reducer(initialBasketDataState, resetCouponDiscount()))
      .toEqual({...initialBasketDataState, couponDiscount: CouponStatus.noDiscount});
  });

  it('should change orderHasPlaced to false', () => {
    expect(basketData.reducer(initialBasketDataState, resetOrderStatus()))
      .toEqual({...initialBasketDataState, orderHasPlaced: false});
  });

  it('should clear basket on clearBasket', () => {
    expect(basketData.reducer({...initialBasketDataState, basketCamerasData: basketFakeCameras}, clearBasket()))
      .toEqual({...initialBasketDataState, basketCamerasData: []});
  });

});
