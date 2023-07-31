import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

type PaginationListProps = {
  totalPages: number[];
  setPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
}

export default function PaginationList({setPage, totalPages, currentPage}: PaginationListProps): JSX.Element | null {
  const handlePageClick = (evt : React.MouseEvent<HTMLAnchorElement>) => {
    const target = evt.target as HTMLElement;
    if (target.tagName === 'A') {
      setPage(+target.id);
    }
  };

  const handlePrevPageClick = () => {
    setPage(currentPage - 1);
  };

  const handleNextPageClick = () => {
    setPage(currentPage + 1);
  };
  if(!totalPages.length || totalPages.length === 1) {
    return null;
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className={`pagination__item ${currentPage >= 2 ? '' : 'is-hidden'}`}><Link className="pagination__link pagination__link--text" to="#" onClick={handlePrevPageClick}>Назад</Link></li>
        {
          totalPages.map((page) => (<li className="pagination__item" key={page}><Link className={`pagination__link ${page === currentPage ? 'pagination__link--active' : ''}`} id={page.toString()} onClick={handlePageClick} to="#">{page}</Link></li>)
          )
        }
        <li className={`pagination__item ${currentPage !== totalPages[totalPages.length - 1] ? '' : 'is-hidden'}`}><Link className="pagination__link pagination__link--text" onClick={handleNextPageClick} to="#">Далее</Link></li>
      </ul>
    </div>
  );
}
