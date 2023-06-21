import { createSlice } from '@reduxjs/toolkit';
import { SlicesNames } from '../../const';
import { CamerasData } from '../../types/cameras-data';
import { ProductDataState } from '../../types/state';
import { fetchProductDataAction } from '../api-actions';


const initialState: ProductDataState = {
  isProductDataLoading: false,
  productData: {} as CamerasData,
};

export const productData = createSlice({
  name: SlicesNames.ProductData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductDataAction.pending, (state) => {
        state.isProductDataLoading = true;
      })
      .addCase(fetchProductDataAction.fulfilled, (state, action) => {
        state.productData = action.payload;
        state.isProductDataLoading = false;
      });
  }
});
