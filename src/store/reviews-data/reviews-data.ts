import { createSlice } from '@reduxjs/toolkit';
import { SlicesNames } from '../../const';
import { ReviewsDataState } from '../../types/state';
import { fetchReviewsDataAction, sendUserReviewAction } from '../api-actions';

export const initialReviewsDataState: ReviewsDataState = {
  isReviewsDataLoading: false,
  reviewsData: [],
  isUserReviewDataSending: false,
};

export const reviewsData = createSlice({
  name: SlicesNames.ReviewsData,
  initialReviewsDataState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsDataAction.pending, (state) => {
        state.isReviewsDataLoading = true;
      })
      .addCase(fetchReviewsDataAction.fulfilled, (state, action) => {
        state.reviewsData = action.payload;
        state.isReviewsDataLoading = false;
      })
      .addCase(sendUserReviewAction.pending, (state) => {
        state.isUserReviewDataSending = true;
      })
      .addCase(sendUserReviewAction.fulfilled, (state, action) => {
        state.reviewsData.unshift(action.payload);
        state.isUserReviewDataSending = false;
      });
  }
});
