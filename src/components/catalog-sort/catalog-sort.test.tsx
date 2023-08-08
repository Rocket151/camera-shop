import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mockStore } from '../../mocks/mocks';
import CatalogSort from './catalog-sort';

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {

    render (
      <Provider store={mockStore}>
        <MemoryRouter>
          <CatalogSort />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
  });
});
