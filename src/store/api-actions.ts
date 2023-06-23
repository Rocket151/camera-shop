import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { CamerasData } from '../types/cameras-data';
import { PromoData } from '../types/promo-data';
import { ReviewData } from '../types/review-data';
import { UserReviewData } from '../types/user-review-data';

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

export const fetchSimilarCamerasDataAction = createAsyncThunk<CamerasData[], string, {
    extra: AxiosInstance;
  }>(
    'fetchSimilarCamerasData',
    async (id, {extra: api}) => {
      const {data} = await api.get<CamerasData[]>(APIRoute.Cameras + id + APIRoute.SimilarCameras);

      return data;
    },
  );

export const fetchReviewsDataAction = createAsyncThunk<ReviewData[], string, {
    extra: AxiosInstance;
  }>(
    'fetchReviewsData',
    async (id, {extra: api}) => {
      const {data} = await api.get<ReviewData[]>(APIRoute.Cameras + id + APIRoute.Reviews);

      return data;
    },
  );

export const sendUserReviewAction = createAsyncThunk<ReviewData, {
  formData: UserReviewData;
  resetFormData: () => void;
  handleModalUserReviewClose: () => void;
  handleModalUserReviewSuccessOpen: () => void;
    },
  {
    extra: AxiosInstance;
  }>(
    'sendUserReview',
    async({formData, resetFormData, handleModalUserReviewClose, handleModalUserReviewSuccessOpen}, {extra: api}) => {
      const {data} = await api.post<ReviewData>(APIRoute.Reviews, formData);
      resetFormData();
      handleModalUserReviewClose();
      handleModalUserReviewSuccessOpen();

      return data;
    }
    );
