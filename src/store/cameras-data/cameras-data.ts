import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SlicesNames } from '../../const';
import { CamerasData } from '../../types/cameras-data';
import { CamerasDataState } from '../../types/state';
import { fetchCamerasDataAction } from '../api-actions';

export const initialCamerasDataState: CamerasDataState = {
  isCamerasDataLoading: false,
  camerasData: [],
  selectedCameraData: {} as CamerasData,
};

export const camerasData = createSlice({
  name: SlicesNames.CamerasData,
  initialState: initialCamerasDataState,
  reducers: {
    selectCameraData: (state, action: PayloadAction<CamerasData>) => {
      state.selectedCameraData = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasDataAction.pending, (state) => {
        state.isCamerasDataLoading = true;
      })
      .addCase(fetchCamerasDataAction.fulfilled, (state, action) => {
        state.camerasData = action.payload;
        state.isCamerasDataLoading = false;
      });
  }
});

export const {selectCameraData} = camerasData.actions;
