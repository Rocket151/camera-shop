import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { fakeCameras, getMockStore, mockState } from '../../mocks/mocks';
import { SlicesNames } from '../../const';
import SimilarCamerasList from './similar-camera-list';

const store = getMockStore({...mockState,
  [SlicesNames.SimilarCamerasData]: {
    similarCamerasData: fakeCameras,
  }
});

describe('Component: SimilarCamerasList', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SimilarCamerasList
            setModalAddItem={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );

    const productCardsAmount = screen.getAllByTestId('product-card').length;
    expect(productCardsAmount).toBe(fakeCameras.length);
  });

  it('should show/not show buttons', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SimilarCamerasList
            setModalAddItem={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );

    const buttonPrev = screen.getByTestId('prev');

    expect(buttonPrev).toBeInTheDocument();
    expect(buttonPrev).toHaveAttribute('disabled');

    const buttonNext = screen.getByTestId('next');
    expect(buttonNext).toBeInTheDocument();
    expect(buttonNext).not.toHaveAttribute('disabled');
  });
});
