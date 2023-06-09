import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { CamerasData } from '../types/cameras-data';
import { PromoData } from '../types/promo-data';

export const fetchCamerasDataAction = createAsyncThunk<CamerasData[], undefined, {
    extra: AxiosInstance;
  }>(
    'fetchCamerasData',
    async (_arg, {extra: api}) => {
      const {data} = await api.get<CamerasData[]>(APIRoute.Cameras);

      return data;
    },
  );

export const fetchPromoDataAction = createAsyncThunk<PromoData, undefined, {
    extra: AxiosInstance;
  }>(
    'fetchPromoData',
    async (_arg, {extra: api}) => {
      const {data} = await api.get<PromoData>(APIRoute.Promo);

      return data;
    },
  );

export const fetchProductDataAction = createAsyncThunk<CamerasData, string, {
    extra: AxiosInstance;
  }>(
    'fetchProductData',
    async (id, {extra: api}) => {
      const {data} = await api.get<CamerasData>(APIRoute.Cameras + id);

      return data;
    },
  );
