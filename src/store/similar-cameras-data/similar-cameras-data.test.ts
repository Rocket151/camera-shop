import { fakeCameras, UNKNOWN_ACTION } from '../../mocks/mocks';
import { fetchSimilarCamerasDataAction } from '../api-actions';
import { initialSimilarCamerasDataState, similarCamerasData } from './similar-cameras-data';

describe('Reducer: promoData', () => {

  it('without additional parameters should return initial state', () => {
    expect(similarCamerasData.reducer(undefined, UNKNOWN_ACTION))
      .toEqual(initialSimilarCamerasDataState);
  });
  it('should update similarCamerasData if fetchSimilarCamerasDataAction fulfilled', () => {
    expect(similarCamerasData.reducer(initialSimilarCamerasDataState, {type: fetchSimilarCamerasDataAction.fulfilled.type, payload: fakeCameras}))
      .toEqual({...initialSimilarCamerasDataState, similarCamerasData: fakeCameras, isSimilarCamerasDataLoading: false });
  });
  it('should change isSimilarCamerasDataLoading to true if similarCamerasData loading', () => {
    expect(similarCamerasData.reducer(initialSimilarCamerasDataState, {type: fetchSimilarCamerasDataAction.pending.type}))
      .toEqual({...initialSimilarCamerasDataState, isSimilarCamerasDataLoading: true});
  });
});
