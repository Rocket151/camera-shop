import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SlicesNames } from '../../const';
import { BasketDataState } from '../../types/state';
import { BasketCamerasData } from '../../types/basket-cameras-data';
import { CamerasData } from '../../types/cameras-data';

export const initialBasketDataState: BasketDataState = {
  basketCamerasData: [],
};

export const basketData = createSlice({
  name: SlicesNames.BasketData,
  initialState: initialBasketDataState,
  reducers: {
    addToBasket: (state, action: PayloadAction<CamerasData>) => {
      if(state.basketCamerasData.length) {
        if(state.basketCamerasData.every((basketCamera) => basketCamera.id === action.payload.id)) {
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

    deleteBasketItem : (state, action: PayloadAction<number>) => {
      state.basketCamerasData = state.basketCamerasData.filter((basketCameraData) => basketCameraData.id !== action.payload);
    },
  }
});

export const {changeBasketItemCount, addToBasket, deleteBasketItem} = basketData.actions;
