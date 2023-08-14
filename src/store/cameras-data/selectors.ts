import { CatalogFilterInitialState } from '../../components/catalog-filter/catalog-filter';
import { SlicesNames } from '../../const';
import { CamerasData } from '../../types/cameras-data';
import { ReviewData } from '../../types/review-data';
import { State } from '../../types/state';


export const getCamerasDataLoadingStatus = (state: State): boolean => state[SlicesNames.CamerasData].isCamerasDataLoading;
export const getFilteredCamerasData = (state: State): CamerasData[] => state[SlicesNames.CamerasData].filteredCamerasData;
export const getCamerasData = (state: State): CamerasData[] => state[SlicesNames.CamerasData].filteredByPriceCamerasData;
export const getCamerasDataFromServer = (state: State): CamerasData[] => state[SlicesNames.CamerasData].camerasData;
export const getSelectedCameraData = (state: State): CamerasData => state[SlicesNames.CamerasData].selectedCameraData;
export const getReviewDataLoadingStatus = (state: State): boolean => state[SlicesNames.CamerasData].isReviewsDataLoading;
export const getProductReviewsData = (state: State): ReviewData[] => state[SlicesNames.CamerasData].productReviewsData;
export const getFiletrsData = (state: State): CatalogFilterInitialState => state[SlicesNames.CamerasData].filters;
export const getSendingReviewStatus = (state: State): boolean => state[SlicesNames.CamerasData].isSuccessReviewSending;
export const getCurrentSortType = (state: State): string => state[SlicesNames.CamerasData].currentSortType;
export const getCurrentSortOrder = (state: State): string => state[SlicesNames.CamerasData].currentSortOrder;
export const getProductMinPrice = (state: State): number => state[SlicesNames.CamerasData].minPrice;
export const getProductMaxPrice = (state: State): number => state[SlicesNames.CamerasData].maxPrice;
