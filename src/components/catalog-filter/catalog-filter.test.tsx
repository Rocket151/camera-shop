import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import { mockStore } from '../../mocks/mocks';
import CatalogFilter from './catalog-filter';


describe('Component: Filters', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <CatalogFilter/>
        </MemoryRouter>
      </Provider>);

    expect(screen.getByRole('heading').innerHTML).toBe('Фильтр');
    expect(screen.getByText(/Тип камеры/i)).toBeInTheDocument();
    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
    expect(screen.getByText(/Уровень/i)).toBeInTheDocument();

    expect(screen.getByRole('button')).toHaveTextContent('Сбросить фильтры');
  });
});
