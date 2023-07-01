import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { SlicesNames } from '../../const';
import { fakeCamera, getMockStore, mockState } from '../../mocks/mocks';
import Promo from './promo';

const store = getMockStore({...mockState,
  [SlicesNames.PromoData]: {
    promoData: fakeCamera,
  }
});

describe('Component: Promo', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Promo />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(fakeCamera.name)).toBeInTheDocument();
    expect(screen.getByText(/Профессиональная камера/i)).toBeInTheDocument();
  });
});
