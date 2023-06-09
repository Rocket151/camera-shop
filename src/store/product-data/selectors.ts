import { SlicesNames } from '../../const';
import { CamerasData } from '../../types/cameras-data';
import { State } from '../../types/state';


export const getProductDataLoadingStatus = (state: State): boolean => state[SlicesNames.ProductData].isProductDataLoading;
export const getProductData = (state: State): CamerasData | null => state[SlicesNames.ProductData].productData;
