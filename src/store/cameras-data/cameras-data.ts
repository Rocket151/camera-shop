import { createSlice } from '@reduxjs/toolkit';
import { SlicesNames } from '../../const';
import { CamerasDataState } from '../../types/state';
import { fetchCamerasDataAction } from '../api-actions';

const initialState: CamerasDataState = {
  isCamerasDataLoading: false,
  camerasData: [],
};

export const camerasData = createSlice({
  name: SlicesNames.CamerasData,
  initialState,
  reducers: {},
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
