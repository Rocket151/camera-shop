import { APIRoute } from '../const';
import { api } from '../store';
import { CamerasData } from '../types/cameras-data';
import { ReviewData } from '../types/review-data';
import { calculateRating } from '../utils';

export async function getCamerasDataWithRating(camerasData: CamerasData[]) {
  const cardsId = [];

  for(let i = 0; i < camerasData.length; i++) {
    cardsId.push(camerasData[i]?.id.toString());
  }
  const allReviewsData = await fetchAllReviewsData(cardsId);

  const camerasDataWithRating: CamerasData[] = [];
  camerasData.forEach((cameraData) => {
    const rating = calculateRating(allReviewsData, cameraData.id);

    camerasDataWithRating.push({
      ...cameraData,
      rating
    });
  });

  return camerasDataWithRating;
}

export async function fetchAllReviewsData (cardsId: string[]) {
  const promises = [];
  for(let i = 0; i < cardsId.length; i++) {
    promises.push(api.get<ReviewData[]>(APIRoute.Cameras + cardsId[i] + APIRoute.Reviews));
  }
  const reviewsData: ReviewData[][] = [];
  const reviewsPromisesData = await Promise.all(promises);
  reviewsPromisesData.forEach((promise) => {
    const {data} = promise;
    reviewsData.push(data);
  });

  return reviewsData.flat();
}
