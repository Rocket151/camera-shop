import { createSlice } from '@reduxjs/toolkit';
import { SlicesNames } from '../../const';
import { PromoDataState } from '../../types/state';
import { fetchPromoDataAction } from '../api-actions';

export const initialPromoDataState: PromoDataState = {
  isPromoDataLoading: false,
  promoData: null,
};

export const promoData = createSlice({
  name: SlicesNames.PromoData,
  initialState: initialPromoDataState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoDataAction.pending, (state) => {
        state.isPromoDataLoading = true;
      })
      .addCase(fetchPromoDataAction.fulfilled, (state, action) => {
        state.promoData = action.payload;
        state.isPromoDataLoading = false;
      });
  }
});
