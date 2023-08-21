import { SlicesNames } from '../../const';
import { State } from '../../types/state';
import { BasketCamerasData } from '../../types/basket-cameras-data';

export const getBasketCamerasData = (state: State): BasketCamerasData[] => state[SlicesNames.BasketData].basketCamerasData;
