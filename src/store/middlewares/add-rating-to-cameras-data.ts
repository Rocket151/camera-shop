import {PayloadAction} from '@reduxjs/toolkit';
import {Middleware} from 'redux';
import { getCamerasDataWithRating } from '../../cameras-data-adapter/cameras-data-adapter';
import { CamerasData } from '../../types/cameras-data';
import {rootReducer} from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const addRatingToCamerasData: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      async (action: PayloadAction<CamerasData[]>) => {
        if (action.type === 'fetchCamerasData/fulfilled' || action.type === 'fetchSimilarCamerasData/fulfilled') {
          action.payload = await getCamerasDataWithRating(action.payload);
        }
        return next(action);
      };
