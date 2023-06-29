import { fakeCameras, UNKNOWN_ACTION } from '../../mocks/mocks';
import { fetchCamerasDataAction } from '../api-actions';
import { camerasData, initialCamerasDataState, selectCameraData } from './cameras-data';

describe('Reducer: camerasData', () => {

  it('without additional parameters should return initial state', () => {
    expect(camerasData.reducer(undefined, UNKNOWN_ACTION))
      .toEqual(initialCamerasDataState);
  });
  it('should update camerasData if fetchCamerasDataAction fulfilled', () => {
    expect(camerasData.reducer(initialCamerasDataState, {type: fetchCamerasDataAction.fulfilled.type, payload: fakeCameras}))
      .toEqual({...initialCamerasDataState, camerasData: fakeCameras, isCamerasDataLoading: false });
  });
  it('should change isCamerasDataLoading to true if camerasData loading', () => {
    expect(camerasData.reducer(initialCamerasDataState, {type: fetchCamerasDataAction.pending.type}))
      .toEqual({...initialCamerasDataState, isCamerasDataLoading: true});
  });
  it('should update selectedCameraData on selectCameraData', () => {
    expect(camerasData.reducer(initialCamerasDataState, selectCameraData(fakeCameras[0])))
      .toEqual({...initialCamerasDataState, selectedCameraData: fakeCameras[0]});
  });
});
