import { useCallback, useEffect, useState } from 'react';
import './main-page.scss';
import SearchForm from '../components/SearchForm/SearchForm';
import List from '../components/ListBlock/ListBlock';
import { TFetchedCardResults } from '../types/types';
import Loader from '../components/Loader/Loader';
import { fetchItems } from '../api/api';
import Pagination from '../components/Pagination/Pagination.tsx';
import { useSearchParams } from 'react-router-dom';

type TMainPageState = {
  cardsList: TFetchedCardResults[] | null;
  pages: number;
  hasError: boolean;
  isLoading: boolean;
  currentPage: number;
};

function MainPage() {
  const [state, setState] = useState<TMainPageState>({
    cardsList: [],
    pages: 0,
    hasError: false,
    isLoading: false,
    currentPage: 1,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  if (state.hasError) {
    throw new Error('test error');
  }

  const localQuery = localStorage.getItem('person') || '';

  const throwErrorFunction = () => {
    setState({ ...state, hasError: true });
  };

  const handleFetch = useCallback(async (param: string | undefined) => {
    setState({ ...state, isLoading: true });

    try {
      const result = await fetchItems(param);

      let data: TFetchedCardResults[];
      let pagesNum: number;
      if (Number(param)) {
        data = [result];
        pagesNum = 0;
      } else {
        data = result.results;
        pagesNum = result.info.pages;
      }
      setState({ ...state, cardsList: data, isLoading: false, pages: pagesNum });
    } catch (error) {
      setState({ ...state, hasError: true, isLoading: false });
    }
  }, []);

  const handleSubmit = (query?: string | undefined) => {
    const userQuery = query?.trim().replace(/\s/, '');
    if (userQuery === '') {
      const pageParam = `?page=${page}`;
      console.log('pageParam', pageParam);
      handleFetch(pageParam);
      return;
    }
    handleFetch(userQuery);
  };

  useEffect(() => {
    localQuery ? handleFetch(localQuery) : handleFetch('');
  }, [handleFetch, localQuery]);

  return (
    <main className="page__main main">
      <button type="button" className="main__error-btn" onClick={throwErrorFunction}>
        Throw Error
      </button>
      <div className="main__input-block">
        <SearchForm onQuerySubmit={handleSubmit} />
      </div>
      <div className="main__list">
        {state.isLoading ? <Loader /> : <List cards={state.cardsList} />}
      </div>
      {state.pages !== 0 && <Pagination pages={state.pages} onTogglePage={handleSubmit} setSearchParams={setSearchParams}/>}
    </main>
  );
}
export default MainPage;
