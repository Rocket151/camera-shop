import { APIRoute } from "../const";
import { fakeCamera, fakeCameras, fakeId, fakePromo, fakeReviews, fakeUserReview, getMockStore, mockApi } from "../mocks/mocks";
import { fetchProductDataAction, fetchPromoDataAction, fetchReviewsDataAction, fetchSimilarCamerasDataAction, sendUserReviewAction } from "./api-actions";

describe('Asynk actions: test', () => {
  it('fetchSimilarCameras  should return similar cameras if server return 200', async() => {
    mockApi
      .onGet(`${APIRoute.Cameras}${fakeId}/similar`)
      .reply(200, fakeCameras);

    const store = getMockStore();
    expect(store.getActions()).toEqual([]);

    const { payload } = await store.dispatch(fetchSimilarCamerasDataAction(fakeId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSimilarCamerasDataAction.pending.type,
      fetchSimilarCamerasDataAction.fulfilled.type
    ]);

    expect(payload).toEqual(fakeCameras);
  });
  it('fetchSimilarCameras  should not return similar cameras if server return 400', async() => {
    mockApi
      .onGet(`${APIRoute.Cameras}${fakeId}/similar`)
      .reply(400, fakeCameras);

    const store = getMockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchSimilarCamerasDataAction(fakeId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSimilarCamerasDataAction.pending.type,
      fetchSimilarCamerasDataAction.rejected.type
    ]);
  });
  it('fetchProductDataAction should return cameraData if server return 200', async() => {
    mockApi
      .onGet(`${APIRoute.Cameras}${fakeId}`)
      .reply(200, fakeCamera);

    const store = getMockStore();
    expect(store.getActions()).toEqual([]);

    const { payload } = await store.dispatch(fetchProductDataAction(fakeId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchProductDataAction.pending.type,
      fetchProductDataAction.fulfilled.type
    ]);

    expect(payload).toEqual(fakeCamera);
  });

  it('fetchPromoDataAction should return promo if server return 200', async() => {
    mockApi
      .onGet(APIRoute.Promo)
      .reply(200, fakePromo);

    const store = getMockStore();
    expect(store.getActions()).toEqual([]);

    const { payload } = await store.dispatch(fetchPromoDataAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoDataAction.pending.type,
      fetchPromoDataAction.fulfilled.type
    ]);

    expect(payload).toEqual(fakePromo);
  });
  it('fetchPromoDataAction should not return promo if server return 400', async() => {
    mockApi
      .onGet(APIRoute.Promo)
      .reply(400, fakePromo);

    const store = getMockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchPromoDataAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoDataAction.pending.type,
      fetchPromoDataAction.rejected.type
    ]);
  });
  it('fetchReviewsDataAction should return reviews if server return 200', async() => {
    mockApi
      .onGet(`${APIRoute.Cameras}${fakeId}/reviews`)
      .reply(200, fakeReviews);

    const store = getMockStore();
    expect(store.getActions()).toEqual([]);

    const { payload } = await store.dispatch(fetchReviewsDataAction(fakeId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReviewsDataAction.pending.type,
      fetchReviewsDataAction.fulfilled.type
    ]);

    expect(payload).toEqual(fakeReviews);
  });
  it('fetchReviewsDataAction should not return reviews if server return 400', async() => {
    mockApi
      .onGet(`${APIRoute.Cameras}${fakeId}/reviews`)
      .reply(400, fakeReviews);

    const store = getMockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchReviewsDataAction(fakeId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReviewsDataAction.pending.type,
      fetchReviewsDataAction.rejected.type
    ]);
  });
  it('sendReviewAction should send review if server return 200', async() => {
    mockApi
      .onPost(APIRoute.Reviews)
      .reply(200);

    const store = getMockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(sendUserReviewAction({formData: fakeUserReview}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      sendUserReviewAction.pending.type,
      sendUserReviewAction.fulfilled.type
    ]);
  });
  it('sendReviewAction should not send review if server return 400', async() => {
    mockApi
      .onPost(APIRoute.Reviews)
      .reply(400);

    const store = getMockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(sendUserReviewAction({formData: fakeUserReview}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      sendUserReviewAction.pending.type,
      sendUserReviewAction.rejected.type
    ]);
  });
});
