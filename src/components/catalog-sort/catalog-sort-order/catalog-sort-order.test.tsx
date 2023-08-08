import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mockStore } from '../../../mocks/mocks';
import CatalogSortOrder from './catalog-sort-order';

describe('Component: CatalogSortOrder', () => {
  it('should render correctly', () => {

    render (
      <Provider store={mockStore}>
        <MemoryRouter>
          <CatalogSortOrder />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('catalog-sort__btn--up')).toBeInTheDocument();
    expect(screen.getByTestId('catalog-sort__btn--down')).toBeInTheDocument();
  });
});
