import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SlicesNames } from '../../const';
import { CamerasData } from '../../types/cameras-data';
import { ReviewData } from '../../types/review-data';
import { CamerasDataState } from '../../types/state';
import { sortCamerasDataByPriceDown, sortCamerasDataByPriceUp, sortReviewsDateDown } from '../../utils';
import { fetchCamerasDataAction, fetchReviewsDataAction, sendUserReviewAction } from '../api-actions';

export const initialCamerasDataState: CamerasDataState = {
  isCamerasDataLoading: false,
  camerasData: [],
  selectedCameraData: {} as CamerasData,
  camerasDataToRender: [],
  currentSortType: '',
  currentSortOrder: '',
  isReviewsDataLoading: false,
  productReviewsData: [] as ReviewData[],
  isSuccessReviewSending: false,
};

export const camerasData = createSlice({
  name: SlicesNames.CamerasData,
  initialState: initialCamerasDataState,
  reducers: {
    changeSuccessSendingReviewStatus: (state, action: PayloadAction<boolean>) => {
      state.isSuccessReviewSending = action.payload;
    },
    selectCameraData: (state, action: PayloadAction<CamerasData>) => {
      state.selectedCameraData = action.payload;
    },
    sortCamerasData: (state) => {
      if (state.currentSortType === 'price' && state.currentSortOrder !== 'up') {
        state.camerasDataToRender = state.camerasData.sort(sortCamerasDataByPriceUp);
      } else if (state.currentSortType === 'price' && state.currentSortOrder !== 'down') {
        state.camerasDataToRender = state.camerasData.sort(sortCamerasDataByPriceDown);
      } else if (state.currentSortType === 'rating' && state.currentSortOrder !== 'up') {
        state.camerasDataToRender = state.camerasData.sort(sortCamerasDataByPriceDown);
      } else if (state.currentSortType === 'rating' && state.currentSortOrder !== 'down') {
        state.camerasDataToRender = state.camerasData.sort(sortCamerasDataByPriceDown);
      } else {
        state.camerasDataToRender = state.camerasData;
      }
    },
    addCamerasData: (state, action: PayloadAction<CamerasData[]>) => {
      state.camerasData = action.payload;
    }

  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasDataAction.pending, (state) => {
        state.isCamerasDataLoading = true;
      })
      .addCase(fetchCamerasDataAction.fulfilled, (state, action) => {
        state.camerasData = action.payload;
        state.isCamerasDataLoading = false;
      })
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
      });
  }
});

export const {selectCameraData, changeSuccessSendingReviewStatus, addCamerasData} = camerasData.actions;
