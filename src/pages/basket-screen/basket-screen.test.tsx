import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { mockStore } from '../../mocks/mocks';
import BasketScreen from './basket-screen';



describe('Component: BasketScreen', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <BasketScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Корзина/)).toBeInTheDocument();
  });
});
