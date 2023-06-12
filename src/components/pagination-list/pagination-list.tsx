import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

type PaginationListProps = {
  totalPages: number[];
  setPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
}

export default function PaginationList({setPage, totalPages, currentPage}: PaginationListProps): JSX.Element {
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

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          currentPage >= 2 ? <li className="pagination__item"><Link className="pagination__link pagination__link--text" to="#" onClick={handlePrevPageClick}>Назад</Link></li> : null
        }

        {
          totalPages.map((page) => (<li className="pagination__item" key={page}><Link className={`pagination__link ${page === currentPage ? 'pagination__link--active' : ''}`} id={page.toString()} onClick={handlePageClick} to="#">{page}</Link></li>)
          )
        }

        {
          currentPage !== totalPages[totalPages.length - 1] ? <li className="pagination__item"><Link className="pagination__link pagination__link--text" onClick={handleNextPageClick} to="#">Далее</Link></li> : null
        }
      </ul>
    </div>
  );
}
