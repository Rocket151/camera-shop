import { SlicesNames } from '../../const';
import { State } from '../../types/state';
import { BasketCamerasData } from '../../types/basket-cameras-data';

export const getBasketCamerasData = (state: State): BasketCamerasData[] => state[SlicesNames.BasketData].basketCamerasData;
export const getItemToRemoveFromBasket = (state: State): BasketCamerasData => state[SlicesNames.BasketData].itemToRemoveFromBasket;
export const getCouponDiscount = (state: State): string => state[SlicesNames.BasketData].couponDiscount;
export const getOrderStatus = (state: State): boolean => state[SlicesNames.BasketData].orderHasPlaced;
