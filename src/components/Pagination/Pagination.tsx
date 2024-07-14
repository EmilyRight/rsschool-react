import { MouseEvent, useEffect, useRef, useState } from 'react';
import './pagination.scss';
import { useNavigate } from 'react-router';

type TPaginationProps = {
  pages: number;
  onTogglePage: (query: string, id: number) => void;
  setSearchParams: (id: string) => void;
};

type TPaginationState = {
  isRightBtnDisabled: boolean;
  isLeftBtnDisabled: boolean;
  transition: number;
  step: number;
  currentPage: number;
};

function Pagination({ pages, onTogglePage }: TPaginationProps) {
  const pagesRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<TPaginationState>({
    isRightBtnDisabled: false,
    isLeftBtnDisabled: true,
    transition: 0,
    step: 0,
    currentPage: 1,
  });
  const pagesArray = [];
  const navigate = useNavigate();
  for (let i = 0; i < pages; i++) {
    pagesArray.push(i + 1);
  }

  const handleChoosePage = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    if (target) {
      const { id } = target;
      setState({ ...state, currentPage: Number(id) });
      onTogglePage('', Number(id));
      setSearchParams(id);
      navigate(`/?page=${id}`);
    }
  };

  const setSearchParams = (id: string) => {
    const queryParams = new URLSearchParams({ page: id });
    console.log(queryParams);

    // setSearchParams(queryParams.size);
  };

  const handleRight = () => {
    if (pagesRef.current && containerRef.current) {
      setState(prevState => {
        return {
          ...prevState,
          isLeftBtnDisabled: false,
          transition: prevState.transition + prevState.step,
        };
      });
      pagesRef.current.style.transform = `translateX(-${state.transition}px)`;
      if (state.transition >= pagesRef.current.offsetWidth - containerRef.current.offsetWidth) {
        setState({ ...state, isRightBtnDisabled: true });
        pagesRef.current.style.right = `translateX(-${state.transition}px)`;
      }
    }
  };

  const handleLeft = () => {
    if (pagesRef.current && containerRef.current) {
      setState(prevState => {
        return {
          ...prevState,
          isRightBtnDisabled: false,
          transition: prevState.transition - prevState.step,
        };
      });
      pagesRef.current.style.transform = `translateX(-${state.transition}px)`;
      if (state.transition <= 0) {
        setState({ ...state, isLeftBtnDisabled: true });
        pagesRef.current.style.left = `translateX(-${state.transition}px)`;
      }
    }
  };

  useEffect(() => {
    if (pagesRef.current) {
      const step = pagesRef.current?.offsetWidth / (pages / 5) || 100;
      setState(prevState => ({ ...prevState, step }));
    }
  }, [state.transition]);

  return (
    <div className="pagination">
      <div className="pagination__inner-container container" ref={containerRef}>
        <div ref={pagesRef} className="container__list list">
          {pagesArray.map(item => {
            return (
              <div
                key={item}
                id={String(item)}
                className={`list__item ${state.currentPage === item ? 'active' : ''}`}
                onClick={handleChoosePage}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <button
        type="button"
        className={`pagination__btn btn-left ${state.isLeftBtnDisabled ? 'disabled' : ''}`}
        disabled={state.isLeftBtnDisabled}
        onClick={handleLeft}
      >
        {'<<'}
      </button>
      <button
        className={`pagination__btn btn-right ${state.isRightBtnDisabled ? 'disabled' : ''} }`}
        onClick={handleRight}
        disabled={state.isRightBtnDisabled}
      >
        {'>>'}
      </button>
    </div>
  );
}

export default Pagination;
