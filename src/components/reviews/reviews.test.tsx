import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import Reviews from './reviews';
import { mockStore } from '../../mocks/mocks';

describe('Component: Review Block', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Reviews setModalAddReview={jest.fn()}/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();

    const buttonElement = screen.getByText(/Оставить свой отзыв/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
