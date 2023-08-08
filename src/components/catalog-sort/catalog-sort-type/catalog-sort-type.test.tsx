import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mockStore } from '../../../mocks/mocks';
import CatalogSortType from './catalog-sort-type';

describe('Component: CatalogSortType', () => {
  it('should render correctly', () => {

    render (
      <Provider store={mockStore}>
        <MemoryRouter>
          <CatalogSortType />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/по популярности/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/по цене/i)).toBeInTheDocument();
  });
});
