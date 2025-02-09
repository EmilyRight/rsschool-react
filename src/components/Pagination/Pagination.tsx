import { useEffect, useState } from 'react';
import './pagination.scss';

type TPageParam = {
  page: string;
};
type TPaginationProps = {
  pages: number;
  isNewSearch: boolean;
  onTogglePage: (page: string) => void;
  setSearchParams: (param: TPageParam) => void;
};

function Pagination({ pages, isNewSearch, onTogglePage, setSearchParams }: TPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isRightBtnDisabled, setIsRightBtnDisabled] = useState(currentPage === pages);
  const [isLeftBtnDisabled, setIsLeftBtnDisabled] = useState(currentPage === 1);

  const handleIncreasePage = () => {
    setCurrentPage(prev => prev + 1);
    onTogglePage(`${currentPage}`);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => prev - 1);
    onTogglePage(`${currentPage}`);
  };

  const setParams = (page: string) => {
    setSearchParams({ page });
  };

  useEffect(() => {
    setParams(String(currentPage));
    if (isNewSearch) setCurrentPage(1);
    setIsRightBtnDisabled(currentPage === pages);
    setIsLeftBtnDisabled(currentPage === 1);
  }, [currentPage, pages]);

  return (
    <div className="pagination">
      <div className="pagination__container">
        <button
          type="button"
          className={`pagination__btn btn-left ${isLeftBtnDisabled ? 'disabled' : ''}`}
          disabled={isLeftBtnDisabled}
          onClick={handlePrevPage}
          role="prev"
        >
          {'<<'}
        </button>

        <div className="pagination__pages-block pages-block">
          <span className="pages-block__page">{currentPage}</span> /{' '}
          <span className="pages-block__page ">{pages}</span>
        </div>

        <button
          className={`pagination__btn btn-right ${isRightBtnDisabled ? 'disabled' : ''} }`}
          role="next"
          onClick={handleIncreasePage}
          disabled={isRightBtnDisabled}
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
}

export default Pagination;
