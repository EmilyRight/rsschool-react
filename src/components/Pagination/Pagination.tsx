import { useEffect, useState } from 'react';
import './pagination.scss';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTheme } from '../../ContextProvider/ContextProvider';



type TPaginationState = {
  isRightBtnDisabled: boolean;
  isLeftBtnDisabled: boolean;
};

function Pagination() {
  const { theme } = useTheme();
  const { pages, currentPage } = useSelector((state: RootState) => state.currentPage);

  const [searchParams, setSearchParams] = useSearchParams();

  const [state, setState] = useState<TPaginationState>({
    isRightBtnDisabled: false,
    isLeftBtnDisabled: true,
  });

  const handleBtns = () => {
    if (currentPage === 1) {
      setState({ isLeftBtnDisabled: true, isRightBtnDisabled: false });
    } else if (pages && currentPage === pages) {
      setState({ isLeftBtnDisabled: false, isRightBtnDisabled: true });
    } else if (pages && currentPage < pages) {
      setState({ isLeftBtnDisabled: false, isRightBtnDisabled: false });
    }
  };

  const handleNext = () => {
    setSearchParams(`?page=${currentPage + 1}`);
  };

  const handlePrev = () => {
    setSearchParams(`?page=${currentPage - 1}`);
  };

  useEffect(() => {
    handleBtns();
  }, [currentPage, searchParams]);

  return (
    <div className="pagination">
      <div className="pagination__buttons">
        <button
          type="button"
          className={`pagination__btn btn-left btn_${theme} ${state.isLeftBtnDisabled ? 'disabled' : ''}`}
          disabled={state.isLeftBtnDisabled}
          onClick={handlePrev}
        >
          Prev
        </button>

        <button
          className={`pagination__btn btn-right btn_${theme} ${state.isRightBtnDisabled ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={state.isRightBtnDisabled}
        >
          Next
        </button>
      </div>
      <div className="pagination__text">
        Page {currentPage} of {pages}
      </div>
    </div>
  );
}

export default Pagination;
