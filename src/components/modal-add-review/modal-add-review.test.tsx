import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import { fakeCamera, mockStore } from '../../mocks/mocks';
import ModalAddReview from './modal-add-review';
import { InputPlaceholder, InputTitle } from '../../const';

describe('Component: ModalAddReviewSuccess', () => {
  const setModalAddReview = jest.fn();

  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ModalAddReview isModalAddReview setModalAddReview={setModalAddReview} productData={fakeCamera}/>
        </MemoryRouter>
      </Provider>);


    expect(screen.getByTestId('review')).toBeInTheDocument();

    expect(screen.getByPlaceholderText(InputPlaceholder.Disadvantage)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(InputPlaceholder.Advantage)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(InputPlaceholder.Name)).toBeInTheDocument();

    expect(screen.getByText(InputTitle.Name)).toBeInTheDocument();
    expect(screen.getByText(/Отправить отзыв/i)).toBeInTheDocument();
  });

  it('setModalAddReview should called when close the modal', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ModalAddReview isModalAddReview={false} setModalAddReview={setModalAddReview} productData={fakeCamera}/>
        </MemoryRouter>
      </Provider>
    );

    const closeButton = screen.getByLabelText('Закрыть попап');
    fireEvent.click(closeButton);

    expect(setModalAddReview).toBeCalled();
  });
});
