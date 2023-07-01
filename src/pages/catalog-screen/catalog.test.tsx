import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { mockStore } from '../../mocks/mocks';
import CatalogScreen from './catalog-screen';



describe('Component: CatalogScreen', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <CatalogScreen/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Каталог фото- и видеотехники/)).toBeInTheDocument();
  });
});
