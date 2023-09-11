import { SlicesNames } from '../../const';
import { PromoData } from '../../types/promo-data';
import { State } from '../../types/state';


export const getPromoDataLoadingStatus = (state: State): boolean => state[SlicesNames.PromoData].isPromoDataLoading;
export const getPromoData = (state: State): PromoData[] | null => state[SlicesNames.PromoData].promoData;
