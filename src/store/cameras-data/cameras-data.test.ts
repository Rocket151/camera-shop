import { SortOrders, SortTypes } from '../../const';
import { fakeCameras, fakeReview, fakeReviews, UNKNOWN_ACTION } from '../../mocks/mocks';
import { getInitalMaxPrice, getInitalMinPrice, sortCamerasDataByPriceUp, sortReviewsDateDown } from '../../utils';
import { fetchCamerasDataAction, fetchReviewsDataAction, sendUserReviewAction } from '../api-actions';
import { camerasData, initialCamerasDataState, selectCameraData, sortCamerasData } from './cameras-data';

describe('Reducer: camerasData', () => {

  it('without additional parameters should return initial state', () => {
    expect(camerasData.reducer(undefined, UNKNOWN_ACTION))
      .toEqual(initialCamerasDataState);
  });
  it('should update camerasData if fetchCamerasDataAction fulfilled', () => {
    expect(camerasData.reducer(initialCamerasDataState, {type: fetchCamerasDataAction.fulfilled.type, payload: fakeCameras}))
      .toEqual({...initialCamerasDataState, camerasData: fakeCameras, minPrice: getInitalMinPrice(fakeCameras), maxPrice: getInitalMaxPrice(fakeCameras),
        filteredCamerasData: fakeCameras, isCamerasDataLoading: false, filteredByPriceCamerasData: fakeCameras});
  });
  it('should change isCamerasDataLoading to true if camerasData loading', () => {
    expect(camerasData.reducer(initialCamerasDataState, {type: fetchCamerasDataAction.pending.type}))
      .toEqual({...initialCamerasDataState, isCamerasDataLoading: true});
  });
  it('should update selectedCameraData on selectCameraData', () => {
    expect(camerasData.reducer(initialCamerasDataState, selectCameraData(fakeCameras[0])))
      .toEqual({...initialCamerasDataState, selectedCameraData: fakeCameras[0]});
  });
  it('should update productReviewsData if fetchReviewsDataAction fulfilled', () => {
    const sortedReviews = fakeReviews.sort(sortReviewsDateDown);

    expect(camerasData.reducer(initialCamerasDataState, {type: fetchReviewsDataAction.fulfilled.type, payload: fakeReviews}))
      .toEqual({...initialCamerasDataState, productReviewsData: sortedReviews, isReviewsDataLoading: false });
  });
  it('should change isReviewsDataLoading to true if ReviewsData loading', () => {
    expect(camerasData.reducer(initialCamerasDataState, {type: fetchReviewsDataAction.pending.type}))
      .toEqual({...initialCamerasDataState, isReviewsDataLoading: true});
  });
  it('should update productReviewsData if sendUserReviewAction fulfilled', () => {
    expect(camerasData.reducer({...initialCamerasDataState, productReviewsData: fakeReviews}, {type: sendUserReviewAction.fulfilled.type, payload: fakeReview}))
      .toEqual({...initialCamerasDataState, productReviewsData: [fakeReview, ...fakeReviews], isSuccessReviewSending: true});
  });
  it('should sort camerasData correctly', () => {
    const arrFakeCameras = [...fakeCameras];
    const sortedCameras = arrFakeCameras.sort(sortCamerasDataByPriceUp);

    expect(camerasData.reducer({...initialCamerasDataState, currentSortType: SortTypes.SortByPrice, currentSortOrder: SortOrders.Up, filteredByPriceCamerasData: fakeCameras}, sortCamerasData()))
      .toEqual({...initialCamerasDataState, filteredByPriceCamerasData: sortedCameras, currentSortType: SortTypes.SortByPrice, currentSortOrder: SortOrders.Up});
  });
});
