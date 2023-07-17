import { SlicesNames } from '../../const';
import { ReviewData } from '../../types/review-data';
import { State } from '../../types/state';


export const getReviewDataLoadingStatus = (state: State): boolean => state[SlicesNames.ReviewsData].isReviewsDataLoading;
export const getProductReviewsData = (state: State): ReviewData[] => state[SlicesNames.ReviewsData].productReviewsData;
export const getSendingReviewStatus = (state: State): boolean => state[SlicesNames.ReviewsData].isSuccessReviewSending;
export const getAllReviewsData = (state: State): ReviewData[] => state[SlicesNames.ReviewsData].allReviewsData;
