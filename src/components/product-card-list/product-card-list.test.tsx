import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { fakeCamera, fakeCameras, mockStore } from '../../mocks/mocks';
import ProductCardList from './product-card-list';

describe('Component: ProductCardList', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ProductCardList
            camerasData={fakeCameras}
            setModalAddItem={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );

    const list = screen.getAllByTestId('product-card');
    expect(list.length).toBe(fakeCameras.length);
  });
});
