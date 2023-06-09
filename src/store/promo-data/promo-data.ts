import { createSlice } from '@reduxjs/toolkit';
import { SlicesNames } from '../../const';
import { PromoDataState } from '../../types/state';
import { fetchPromoDataAction } from '../api-actions';

const initialState: PromoDataState = {
  isPromoDataLoading: false,
  promoData: null,
};

export const promoData = createSlice({
  name: SlicesNames.PromoData,
  initialState,
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
