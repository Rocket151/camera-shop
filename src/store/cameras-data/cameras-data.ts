import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatalogFilterInitialState } from '../../components/catalog-filter/catalog-filter';
import { SlicesNames, SortOrders, SortTypes } from '../../const';
import { CamerasData } from '../../types/cameras-data';
import { ReviewData } from '../../types/review-data';
import { CamerasDataState } from '../../types/state';
import { filterByIsPhotocamera, filterByIsVideocamera, filterByСameraIsCollection, filterByСameraIsDigital, filterByСameraIsFilm, filterByСameraIsNonProfessional, filterByСameraIsProfessional, filterByСameraIsSnapshot, filterByСameraIsZeroLevel, sortCamerasDataByPopularDown, sortCamerasDataByPopularUp, sortCamerasDataByPriceDown, sortCamerasDataByPriceUp, sortReviewsDateDown } from '../../utils';
import { fetchCamerasDataAction, fetchReviewsDataAction, sendUserReviewAction } from '../api-actions';

export const initialCamerasDataState: CamerasDataState = {
  isCamerasDataLoading: false,
  camerasData: [],
  selectedCameraData: {} as CamerasData,
  filteredCamerasData: [],
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
      if ((state.currentSortType === SortTypes.SortByPrice) && (state.currentSortOrder === SortOrders.Up)) {
        state.filteredCamerasData.sort(sortCamerasDataByPriceUp);
      } else if ((state.currentSortType === SortTypes.SortByPrice) && (state.currentSortOrder === SortOrders.Down)) {
        state.filteredCamerasData.sort(sortCamerasDataByPriceDown);
      } else if ((state.currentSortType === SortTypes.SortByPopular) && (state.currentSortOrder === SortOrders.Up)) {
        state.filteredCamerasData.sort(sortCamerasDataByPopularUp);
      } else if ((state.currentSortType === SortTypes.SortByPopular) && (state.currentSortOrder === SortOrders.Down)) {
        state.filteredCamerasData.sort(sortCamerasDataByPopularDown);
      }
    },
    setCurrentSortType: (state, action: PayloadAction<string>) => {
      state.currentSortType = action.payload;
    },
    setCurrentSortOrder: (state, action: PayloadAction<string>) => {
      state.currentSortOrder = action.payload;
    },
    filterCamerasData: (state, action: PayloadAction<CatalogFilterInitialState>) => {
      const filteredCamerasData = [];
      for(const cameraData of state.camerasData) {
        if(filterByIsPhotocamera(action.payload.photocamera, cameraData) &&
        filterByIsVideocamera(action.payload.videocamera, cameraData) &&
        ((!action.payload.digital && !action.payload.film && !action.payload.snapshot) ||
        (filterByСameraIsCollection(action.payload.collection, cameraData) ||
        filterByСameraIsDigital(action.payload.digital, cameraData) ||
        filterByСameraIsFilm(action.payload.film, cameraData) ||
        filterByСameraIsSnapshot(action.payload.snapshot, cameraData))) &&
        ((!action.payload.zero && !action.payload.nonProfessional && !action.payload.professional) ||
        (filterByСameraIsZeroLevel(action.payload.zero, cameraData) ||
        filterByСameraIsNonProfessional(action.payload.nonProfessional, cameraData) ||
        filterByСameraIsProfessional(action.payload.professional, cameraData)))
        ) {
          filteredCamerasData.push(cameraData);
        }
      }
      state.filteredCamerasData = filteredCamerasData;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasDataAction.pending, (state) => {
        state.isCamerasDataLoading = true;
      })
      .addCase(fetchCamerasDataAction.fulfilled, (state, action) => {
        state.camerasData = action.payload;
        state.filteredCamerasData = action.payload;
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

export const {selectCameraData, changeSuccessSendingReviewStatus, setCurrentSortOrder, setCurrentSortType, sortCamerasData, filterCamerasData} = camerasData.actions;
