import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { mockStore } from '../../mocks/mocks';
import NotFoundScreen from './not-found-screen';


describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <NotFoundScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Страница не найдена/)).toBeInTheDocument();
  });
});
