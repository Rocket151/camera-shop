import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { SlicesNames } from '../../const';
import { fakeCamera, getMockStore, mockState } from '../../mocks/mocks';
import ProductCardRating from './product-card-rating';

const store = getMockStore({...mockState,
  [SlicesNames.ProductData]: {
    productData: fakeCamera,
  }
});

describe('Component: ProductCardRating', () => {
  it ('should render correctly', () => {
    render (
      <Provider store={store}>
        <ProductCardRating reviewsCount={fakeCamera.reviewCount} cameraData={fakeCamera}/>
      </Provider>
    );

    expect(screen.getByText(fakeCamera.reviewCount)).toBeInTheDocument();
  });
});
