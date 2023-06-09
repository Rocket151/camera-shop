import { CamerasData } from './cameras-data';

export type PromoData = Pick<CamerasData, 'previewImg' | 'previewImg2x' | 'previewImgWebp' | 'previewImgWebp2x' | 'id' | 'name'>;
