import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { mockStore } from '../../mocks/mocks';
import ProductScreen from './product-screen';

describe('Component: Product Page', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ProductScreen/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Всего оценок/i)).toBeInTheDocument();
  });
});
