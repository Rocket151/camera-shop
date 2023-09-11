import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { SlicesNames } from '../../const';
import { fakeCameras, getMockStore, mockState } from '../../mocks/mocks';
import Promo from './promo';

const store = getMockStore({...mockState,
  [SlicesNames.PromoData]: {
    promoData: fakeCameras,
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
    expect(screen.getByText(fakeCameras[1].name)).toBeInTheDocument();
    expect(screen.getByText(/Профессиональная камера/i)).toBeInTheDocument();
  });
});
