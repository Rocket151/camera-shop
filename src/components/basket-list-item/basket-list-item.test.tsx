import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { basketFakeCamera, mockStore } from '../../mocks/mocks';
import BasketListItem from './basket-list-item';

describe('Component: BasketListItem', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <BasketListItem
            basketListItem={basketFakeCamera}
            setModalRemoveBasketItem={jest.fn()}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(basketFakeCamera.name)).toBeInTheDocument();
    expect(screen.getByText(basketFakeCamera.type)).toBeInTheDocument();
    expect(screen.getByText(basketFakeCamera.level)).toBeInTheDocument();
  });
});
