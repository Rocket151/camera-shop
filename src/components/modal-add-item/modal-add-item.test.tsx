import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { fakeCamera, getMockStore } from '../../mocks/mocks';
import { SlicesNames } from '../../const';
import ModalAddItem from './modal-add-item';

const store = getMockStore({
  [SlicesNames.CamerasData]: {
    selectedCameraData: fakeCamera,
  }
});

describe('Component: Basket Info Modal', () => {
  const setModalAddItem = jest.fn();

  it('should render correctly ModalAddItem modal', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalAddItem setModalAddItem={setModalAddItem} isModalAddItem/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('add-item-modal')).toBeInTheDocument();
  });

  it('setModalAddItem should called when close the modal', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalAddItem setModalAddItem={setModalAddItem} isModalAddItem={false}/>
        </MemoryRouter>
      </Provider>
    );

    const closeButton = screen.getByLabelText('Закрыть попап');
    fireEvent.click(closeButton);

    expect(setModalAddItem).toBeCalled();
  });
});
