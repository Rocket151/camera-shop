import { createSlice } from '@reduxjs/toolkit';
import { SlicesNames } from '../../const';
import { BasketDataState } from '../../types/state';

export const initialBasketDataState: BasketDataState = {
  basketCamerasData: [];
};

export const basketData = createSlice({
  name: SlicesNames.BasketData,
  initialState: initialBasketDataState,
  reducers: {
    addToBasket: (state, action: PayloadAction<BasketCamerasData>) => {
      if(state.basketCamerasData.length) {
        if(state.basketCamerasData.every((basketCamera) => basketCamera.id === action.payload.id)) {
          state.basketCamerasData.map((basketCameraData) => {
            if(basketCameraData.id === action.payload.id) {
              return {
                ...basketCameraData,
                basketItemCount: ++basketCameraData.basketItemCount,
              }
            }
            return basketCameraData
          })
        } else {
          state.basketCamerasData.push(action.payload);
        }
      }
    },
  },
});