import { fakeReview, fakeReviews, UNKNOWN_ACTION } from '../../mocks/mocks';
import { fetchReviewsDataAction, sendUserReviewAction } from '../api-actions';
import { initialReviewsDataState, reviewsData } from './reviews-data';


describe('Reducer: reviewsData', () => {

  it('without additional parameters should return initial state', () => {
    expect(reviewsData.reducer(undefined, UNKNOWN_ACTION))
      .toEqual(initialReviewsDataState);
  });
  it('should update reviewsData if fetchReviewsDataAction fulfilled', () => {
    expect(reviewsData.reducer(initialReviewsDataState, {type: fetchReviewsDataAction.fulfilled.type, payload: fakeReviews}))
      .toEqual({...initialReviewsDataState, reviewsData: fakeReviews, isReviewsDataLoading: false });
  });
  it('should change isReviewsDataLoading to true if ReviewsData loading', () => {
    expect(reviewsData.reducer(initialReviewsDataState, {type: fetchReviewsDataAction.pending.type}))
      .toEqual({...initialReviewsDataState, isPromoDataLoading: true});
  });
  it('should update reviewsData if sendUserReviewAction fulfilled', () => {
    expect(reviewsData.reducer(initialReviewsDataState, {type: sendUserReviewAction.fulfilled.type, payload: fakeReview}))
      .toEqual({...initialReviewsDataState, reviewsData: fakeReview});
  });
});
