export type CamerasData = {
    id: number;
    name: string;
    vendorCode: string;
    type: 'Моментальная '|'Цифровая' | 'Плёночная';
    category: 'Видеокамера' | 'Фотоаппарат';
    description: string;
    reviewCount: number;
    level: 'Нулевой' | 'Любительский' | 'Профессиональный';
    price: number;
    previewImg: string;
    previewImg2x: string;
    previewImgWebp: string;
    previewImgWebp2x: string;
}
