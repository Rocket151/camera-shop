import { SlicesNames } from '../../const';
import { CamerasData } from '../../types/cameras-data';
import { State } from '../../types/state';


export const getCamerasDataLoadingStatus = (state: State): boolean => state[SlicesNames.CamerasData].isCamerasDataLoading;
export const getCamerasData = (state: State): CamerasData[] => state[SlicesNames.CamerasData].camerasData;
export const getSelectedCameraData = (state: State): CamerasData => state[SlicesNames.CamerasData].selectedCameraData;
