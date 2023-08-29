import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { mockStore } from '../../mocks/mocks';
import ModalRemoveBasketItem from './modal-remove-basket-item';

describe('Component: ModalRemoveBasketItem', () => {
  const setModalRemoveBasketItem = jest.fn();

  it('should render correctly ModalRemoveBasketItem modal', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ModalRemoveBasketItem setModalRemoveBasketItem={setModalRemoveBasketItem} isModalRemoveBasketItem />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('modal-remove-basket-item')).toBeInTheDocument();
  });

  it('setModalRemoveBasketItem should called when close the modal', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ModalRemoveBasketItem setModalRemoveBasketItem={setModalRemoveBasketItem} isModalRemoveBasketItem />
        </MemoryRouter>
      </Provider>
    );

    const closeButton = screen.getByLabelText('Закрыть попап');
    fireEvent.click(closeButton);

    expect(setModalRemoveBasketItem).toBeCalled();
  });
});
