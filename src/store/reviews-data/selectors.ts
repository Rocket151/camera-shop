import { SlicesNames } from '../../const';
import { ReviewData } from '../../types/review-data';
import { State } from '../../types/state';


export const getReviewDataLoadingStatus = (state: State): boolean => state[SlicesNames.ReviewsData].isReviewsDataLoading;
export const getReviewsData = (state: State): ReviewData[] => state[SlicesNames.ReviewsData].reviewsData;
export const getSendingReviewStatus = (state: State): boolean => state[SlicesNames.ReviewsData].isSuccessReviewSending;
