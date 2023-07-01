import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import {fakeCamera, mockState, mockStore} from '../../mocks/mocks';
import BreadCrumbs from './breadcrumbs';
import { AppRoute } from '../../const';


describe('Component: Breadcrumbs', () => {
  it('should render correctly on catalog page', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/']}>
          <BreadCrumbs />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();

    const list = screen.getByRole('list');
    expect(list.childNodes.length).toBe(1);
  });
  
  it('should render correctly on product page', () => {
    mockState.PRODUCT_DATA.productData = fakeCamera;

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={[`${AppRoute.Product}:id`]}>
          <BreadCrumbs />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(fakeCamera.name)).toBeInTheDocument();

    const list = screen.getByRole('list');
    expect(list.childNodes.length).toBe(2);
  });

  it('should render correctly on basket page', () => {

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={[`${AppRoute.Basket}`]}>
          <BreadCrumbs />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Корзина/i)).toBeInTheDocument();

    const list = screen.getByRole('list');
    expect(list.childNodes.length).toBe(2);
  });
})
