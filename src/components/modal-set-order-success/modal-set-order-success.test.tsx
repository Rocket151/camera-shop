import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockStore } from '../../mocks/mocks';
import ModalSetOrderSuccess from './modal-set-order-success';

describe('Component: ModalSetOrderSuccess', () => {
  const setModalSetOrderSuccess = jest.fn();

  it('should render correctly ModalSetOrderSuccess modal', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ModalSetOrderSuccess setModalSetOrderSuccess={setModalSetOrderSuccess} isModalSetOrderSuccess />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('modal-set-order-success')).toBeInTheDocument();
  });

  it('setModalSetOrderSuccess should called when close the modal', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ModalSetOrderSuccess setModalSetOrderSuccess={setModalSetOrderSuccess} isModalSetOrderSuccess />
        </MemoryRouter>
      </Provider>
    );

    const closeButton = screen.getByLabelText('Закрыть попап');
    fireEvent.click(closeButton);

    expect(setModalSetOrderSuccess).toBeCalled();
  });
});
