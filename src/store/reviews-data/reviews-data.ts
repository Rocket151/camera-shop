import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SlicesNames } from '../../const';
import { ReviewsDataState } from '../../types/state';
import { sortReviewsDateDown } from '../../utils';
import { fetchAllReviewsDataAction, fetchReviewsDataAction, sendUserReviewAction } from '../api-actions';

export const initialReviewsDataState: ReviewsDataState = {
  isReviewsDataLoading: false,
  productReviewsData: [],
  allReviewsData:[],
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
        state.productReviewsData = action.payload.sort(sortReviewsDateDown);
        state.isReviewsDataLoading = false;
      })
      .addCase(sendUserReviewAction.fulfilled, (state, action) => {
        state.productReviewsData.unshift(action.payload);
        state.isSuccessReviewSending = true;
      })
      .addCase(fetchAllReviewsDataAction.pending, (state) => {
        state.isReviewsDataLoading = true;
      })
      .addCase(fetchAllReviewsDataAction.fulfilled, (state, action) => {
        state.allReviewsData = action.payload.flat();
        state.isReviewsDataLoading = false;
      });
  }
});

export const { changeSuccessSendingReviewStatus } = reviewsData.actions;
