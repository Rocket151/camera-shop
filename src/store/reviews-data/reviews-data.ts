import { createSlice } from '@reduxjs/toolkit';
import { SlicesNames } from '../../const';
import { ReviewsDataState } from '../../types/state';
import { fetchReviewsDataAction } from '../api-actions';

const initialState: ReviewsDataState = {
  isReviewsDataLoading: false,
  reviewsData: [],
};

export const reviewsData = createSlice({
  name: SlicesNames.ReviewsData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsDataAction.pending, (state) => {
        state.isReviewsDataLoading = true;
      })
      .addCase(fetchReviewsDataAction.fulfilled, (state, action) => {
        state.reviewsData = action.payload;
        state.isReviewsDataLoading = false;
      });
  }
});
