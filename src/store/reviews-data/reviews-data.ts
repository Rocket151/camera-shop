import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SlicesNames } from '../../const';
import { ReviewsDataState } from '../../types/state';
import { fetchReviewsDataAction, sendUserReviewAction } from '../api-actions';

export const initialReviewsDataState: ReviewsDataState = {
  isReviewsDataLoading: false,
  reviewsData: [],
  isSuccessReviewSending: false,
};

export const reviewsData = createSlice({
  name: SlicesNames.ReviewsData,
  initialState: initialReviewsDataState,
  reducers: {
    changeSuccessSendingReviewStatus: (state, action: PayloadAction<boolean>) => {
      state.isSuccessReviewSending = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsDataAction.pending, (state) => {
        state.isReviewsDataLoading = true;
      })
      .addCase(fetchReviewsDataAction.fulfilled, (state, action) => {
        state.reviewsData = action.payload;
        state.isReviewsDataLoading = false;
      })
      .addCase(sendUserReviewAction.fulfilled, (state, action) => {
        state.reviewsData.unshift(action.payload);
        state.isSuccessReviewSending = true;
      });
  }
});

export const { changeSuccessSendingReviewStatus } = reviewsData.actions;
