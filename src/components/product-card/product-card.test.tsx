import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import ProductCard from './product-card';
import { fakeCamera, mockStore } from '../../mocks/mocks';

describe('Component: ProductCard', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ProductCard
            cameraData={fakeCamera}
            setModalAddItem={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Цена/i)).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Купить');
    expect(screen.getByText(fakeCamera.reviewCount)).toBeInTheDocument();
  });
});
