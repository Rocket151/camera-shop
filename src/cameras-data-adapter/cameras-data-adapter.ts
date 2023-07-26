import { APIRoute } from '../const';
import { api } from '../store';
import { CamerasData } from '../types/cameras-data';
import { ReviewData } from '../types/review-data';
import { calculateRating } from '../utils';

export async function getCamerasDataWithRating() {
  const {data} = await api.get<CamerasData[]>(APIRoute.Cameras);
  const cardsId = [];

  for(let i = 0; i < data.length; i++) {
    cardsId.push(data[i]?.id.toString());
  }
  const allReviewsData = await fetchAllReviewsData(cardsId);
  console.log(allReviewsData)

  const camerasDataWithRating: CamerasData[] = [];
  data.forEach((cameraData) => {
    const rating = calculateRating(allReviewsData, cameraData.id);

    camerasDataWithRating.push({
      ...cameraData,
      rating
    });
  });
  console.log(camerasDataWithRating);
  return camerasDataWithRating;
}

export async function fetchAllReviewsData (cardsId: string[]) {
  const promises = [];
  for(let i = 0; i < cardsId.length; i++) {
    promises.push(api.get<ReviewData[]>(APIRoute.Cameras + cardsId[i] + APIRoute.Reviews));
  }
  const reviewsData: ReviewData[][] = []
  const  reviewsPromisesData = await Promise.all(promises);
  reviewsPromisesData.forEach((promise) => {
   const  {data} = promise;
    reviewsData.push(data)
  });;

  console.log(reviewsData)

  return reviewsData.flat();
}
