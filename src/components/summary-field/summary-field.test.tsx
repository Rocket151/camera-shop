import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import {  mockStore } from '../../mocks/mocks';
import SummaryField from './summary-field';

describe('Component: SummaryField', () => {
  it('should render correctly', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <SummaryField />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/К оплате/i)).toBeInTheDocument();
    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
    expect(screen.getByText(/Применить/i)).toBeInTheDocument();
  });
});
