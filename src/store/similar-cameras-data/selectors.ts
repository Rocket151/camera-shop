import { SlicesNames } from '../../const';
import { CamerasData } from '../../types/cameras-data';
import { State } from '../../types/state';


export const getSimilarCamerasDataLoadingStatus = (state: State): boolean => state[SlicesNames.SimilarCamerasData].isSimilarCamerasDataLoading;
export const getSimilarCamerasData = (state: State): CamerasData[] => state[SlicesNames.SimilarCamerasData].similarCamerasData;
