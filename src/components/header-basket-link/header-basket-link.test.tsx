import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { SlicesNames } from '../../const';
import { basketFakeCameras, getMockStore, mockState } from '../../mocks/mocks';
import HeaderBasketLink from './header-basket-link';

const store = getMockStore({...mockState,
  [SlicesNames.BasketData]: {
    basketCamerasData: basketFakeCameras,
  }
});

describe('Component: HeaderBasketLink', () => {
  it ('should render correctly', () => {
    const basketItemsAmount = basketFakeCameras.reduce((acc, val) => {
      acc += val.basketItemCount;

      return acc;
    }, 0);

    render (
      <MemoryRouter>
        <Provider store={store}>
          <HeaderBasketLink />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(basketItemsAmount)).toBeInTheDocument();
  });
});
