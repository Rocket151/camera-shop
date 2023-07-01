import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import { mockStore } from '../../mocks/mocks';
import ModalAddReviewSuccess from './modal-add-review-success';

describe('Component: ModalAddReview', () => {
  const setModalAddReviewSuccess = jest.fn();

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ModalAddReviewSuccess isModalAddReviewSuccess setModalAddReviewSuccess={setModalAddReviewSuccess} />
        </MemoryRouter>
      </Provider>);


    expect(screen.getByTestId('add-review-success')).toBeInTheDocument();

    expect(screen.getByText(/Спасибо за отзыв/i)).toBeInTheDocument();
  });

  it('setModalAddReview should called when close the modal', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ModalAddReviewSuccess isModalAddReviewSuccess={false} setModalAddReviewSuccess={setModalAddReviewSuccess} />
        </MemoryRouter>
      </Provider>
    );

    const closeButton = screen.getByText('Вернуться к покупкам');
    fireEvent.click(closeButton);

    expect(setModalAddReviewSuccess).toBeCalled();
  });
});
