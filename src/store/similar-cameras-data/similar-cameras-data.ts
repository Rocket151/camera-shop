import { createSlice } from '@reduxjs/toolkit';
import { SlicesNames } from '../../const';
import { SimilarCamerasDataState } from '../../types/state';
import { fetchCamerasDataAction, fetchSimilarCamerastDataAction } from '../api-actions';

const initialState: SimilarCamerasDataState = {
  isSimilarCamerasDataLoading: false,
  similarCamerasData: [],
};

export const similarCamerasData = createSlice({
  name: SlicesNames.SimilarCamerasData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSimilarCamerastDataAction.pending, (state) => {
        state.isSimilarCamerasDataLoading = true;
      })
      .addCase(fetchCamerasDataAction.fulfilled, (state, action) => {
        state.similarCamerasData = action.payload;
        state.isSimilarCamerasDataLoading = false;
      });
  }
});
