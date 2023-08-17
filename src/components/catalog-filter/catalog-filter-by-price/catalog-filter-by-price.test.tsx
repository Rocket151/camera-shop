import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mockStore } from '../../../mocks/mocks';
import CatalogFilterByPrice from './catalog-filter-by-price';

describe('Component: CatalogSortOrder', () => {
  it('should render correctly', () => {

    render (
      <Provider store={mockStore}>
        <MemoryRouter>
          <CatalogFilterByPrice />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('priceMin')).toBeInTheDocument();
    expect(screen.getByTestId('priceMax')).toBeInTheDocument();
  });
});
