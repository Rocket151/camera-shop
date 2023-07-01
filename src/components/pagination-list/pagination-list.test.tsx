import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { fakeCameras, fakeCurrentPage, mockStore } from "../../mocks/mocks";
import { getPagesNumber } from "../../utils";
import PaginationList from "./pagination-list";


describe('Component: PaginationList', () => {
    const setPage = jest.fn();
    const fakeTotalPages = getPagesNumber(fakeCameras)

    it('should render correctly', () => {
  
      render (
        <Provider store={mockStore}>
          <MemoryRouter>
            <PaginationList setPage={setPage} totalPages={fakeTotalPages} currentPage={fakeCurrentPage}/>
          </MemoryRouter>
        </Provider>
      );

      const list = screen.getByRole('list');
      expect(list.childNodes.length-2).toBe(fakeTotalPages.length);

      const link = screen.getByText(fakeCurrentPage);
      expect(link).toBeInTheDocument();
      expect(link).toHaveClass('pagination__link--active');
  
    });
  });
