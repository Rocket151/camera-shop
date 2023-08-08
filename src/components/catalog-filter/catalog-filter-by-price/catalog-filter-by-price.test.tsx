import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mockStore } from '../../../mocks/mocks';
import CatalogFilterByPrice from './catalog-filter-by-price';

describe('Component: CatalogSortOrder', () => {
  it('should render correctly', () => {
    const initialState = {
        photocamera: false,
        videocamera: false,
        digital: false,
        film: false,
        snapshot: false,
        collection: false,
        zero: false,
        nonProfessional: false,
        professional: false,
      };

    render (
      <Provider store={mockStore}>
        <MemoryRouter>
          <CatalogFilterByPrice filters={initialState}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('priceMin')).toBeInTheDocument();
    expect(screen.getByTestId('priceMax')).toBeInTheDocument();
  });
});
