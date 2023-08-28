import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CouponStatus, SlicesNames } from '../../const';
import { BasketDataState } from '../../types/state';
import { BasketCamerasData } from '../../types/basket-cameras-data';
import { CamerasData } from '../../types/cameras-data';
import { checkCouponAction, setOrderAction } from '../api-actions';

export const initialBasketDataState: BasketDataState = {
  basketCamerasData: [],
  itemToRemoveFromBasket: {} as BasketCamerasData,
  couponDiscount: CouponStatus.noDiscount,
  orderHasPlaced: false,
};

export const basketData = createSlice({
  name: SlicesNames.BasketData,
  initialState: initialBasketDataState,
  reducers: {
    addToBasket: (state, action: PayloadAction<CamerasData>) => {
      if(state.basketCamerasData.length) {
        if(state.basketCamerasData.some((basketCamera) => basketCamera.id === action.payload.id)) {
          state.basketCamerasData = state.basketCamerasData.map((basketCameraData) => {
            if(basketCameraData.id === action.payload.id) {
              return {
                ...basketCameraData,
                basketItemCount: ++basketCameraData.basketItemCount,
              };
            }
            return basketCameraData;
          });
        } else {
          state.basketCamerasData.push({
            ...action.payload,
            basketItemCount: 1,
          });
        }
      } else {
        state.basketCamerasData.push({
          ...action.payload,
          basketItemCount: 1,
        });
      }
    },

    changeBasketItemCount: (state, action: PayloadAction<BasketCamerasData>) => {
      state.basketCamerasData = state.basketCamerasData.map((basketCameraData) => {
        if(basketCameraData.id === action.payload.id) {
          return {
            ...basketCameraData,
            basketItemCount: action.payload.basketItemCount,
          };
        }
        return basketCameraData;
      });
    },

    setItemToRemoveFromBasket : (state, action: PayloadAction<BasketCamerasData>) => {
      state.itemToRemoveFromBasket = action.payload;
    },

    deleteBasketItem : (state, action: PayloadAction<number>) => {
      state.basketCamerasData = state.basketCamerasData.filter((basketCameraData) => basketCameraData.id !== action.payload);
    },

    resetCouponDiscount : (state) => {
      state.couponDiscount = CouponStatus.noDiscount;
    },

    resetOrderStatus : (state) => {
      state.orderHasPlaced = false;
    },

    clearBasket : (state) => {
      state.basketCamerasData = [];
    },
  },
  extraReducers (builder) {
    builder
      .addCase(checkCouponAction.fulfilled, (state, action) => {
        state.couponDiscount = action.payload;
      })
      .addCase(checkCouponAction.rejected, (state) => {
        state.couponDiscount = CouponStatus.InvalidCoupon;
      })
      .addCase(setOrderAction.fulfilled, (state) => {
        state.orderHasPlaced = true;
      })
      .addCase(setOrderAction.rejected, (state) => {
        state.orderHasPlaced = false;
      });
  }
});

export const {changeBasketItemCount, addToBasket, deleteBasketItem, setItemToRemoveFromBasket,
  resetCouponDiscount, resetOrderStatus, clearBasket} = basketData.actions;
