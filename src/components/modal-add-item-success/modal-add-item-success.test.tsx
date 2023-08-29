import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { fakeCamera, getMockStore } from '../../mocks/mocks';
import { SlicesNames } from '../../const';
import ModalAddItemSuccess from './modal-add-item-success';

const store = getMockStore({
  [SlicesNames.CamerasData]: {
    selectedCameraData: fakeCamera,
  }
});

describe('Component: ModalAddItemSuccess', () => {
  const setModalAddItemSuccess = jest.fn();

  it('should render correctly ModalAddItemSuccess modal', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalAddItemSuccess setModalAddItemSuccess={setModalAddItemSuccess}  isModalAddItemSuccess isProductScreen/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('add-item-modal-success')).toBeInTheDocument();
  });

  it('setModalAddItem should called when close the modal', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalAddItemSuccess setModalAddItemSuccess={setModalAddItemSuccess} isModalAddItemSuccess isProductScreen/>
        </MemoryRouter>
      </Provider>
    );

    const closeButton = screen.getByLabelText('Закрыть попап');
    fireEvent.click(closeButton);

    expect(setModalAddItemSuccess).toBeCalled();
  });
});
