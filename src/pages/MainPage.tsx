import { useEffect, useState } from 'react';
import './main-page.scss';
import SearchForm from '../components/SearchForm/SearchForm';
import List from '../components/ListBlock/ListBlock';
import { TFetchedCardResults } from '../types/types';
import Loader from '../components/Loader/Loader';
import { fetchItems } from '../api/api';
import Pagination from '../components/Pagination/Pagination.tsx';
import { Outlet, useSearchParams } from 'react-router-dom';
import useLocalStorage from '../hooks/localStorage.tsx';

type TMainPageState = {
  cardsList: TFetchedCardResults[] | null;
  pages: number;
  hasError: boolean;
  isLoading: boolean;
  isSingleCardOpened: boolean;
};

function MainPage() {
  const [state, setState] = useState<TMainPageState>({
    cardsList: [],
    pages: 0,
    hasError: false,
    isLoading: false,
    isSingleCardOpened: false,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [storedValue] = useLocalStorage<string>('person');

  if (state.hasError) {
    throw new Error('test error');
  }

  const throwErrorFunction = () => {
    setState(prevState => ({ ...prevState, hasError: true }));
  };

  const toggleSingleCard = () => {
    setState(prevState => ({ ...prevState, isSingleCardOpened: !prevState.isSingleCardOpened }));
  };

  const handleFetch = async (param: string | undefined) => {
    setState(prevState => ({ ...prevState, isLoading: true }));

    try {
      const result = await fetchItems(param);
      console.log('handleFetch', param);

      let data: TFetchedCardResults[];
      let pagesNum: number;
      if (Number(param)) {
        data = [result];
        pagesNum = 0;
        setState(prevState => ({
          ...prevState,
          cardsList: data,
          isLoading: false,
          pages: pagesNum,
        }));
      } else {
        data = result.results;
        pagesNum = result.info.pages;
        setState(prevState => ({
          ...prevState,
          cardsList: data,
          isLoading: false,
          pages: pagesNum,
        }));
      }
    } catch (error) {
      setState(prevState => ({ ...prevState, hasError: true, isLoading: false }));
    }
  };

  const handleFetchPage = (page: string) => {
    const pageParam = `?page=${page}`;
    handleFetch(pageParam);
  };

  const handleSubmit = (query?: string | null) => {
    setState(prevState => ({ ...prevState, isSingleCardOpened: false }));
    const userQuery = query?.trim().replace(/\s/, '');

    if (!userQuery) {
      const page = searchParams.get('page') || '1';
      handleFetchPage(page);
      return;
    }

    handleFetch(userQuery);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      if (storedValue && storedValue !== '') {
        await handleFetch(storedValue);
        console.log('render storedValue');
      } else {
        const page = searchParams.get('page') || '1';
        handleFetchPage(page);
        console.log('render page');
      }
    };

    fetchInitialData();
  }, [storedValue, searchParams]);

  return (
    <main className="page__main main">
      <button type="button" className="main__error-btn" onClick={throwErrorFunction}>
        Throw Error
      </button>
      <div className="main__input-block">
        <SearchForm onQuerySubmit={handleSubmit} />
      </div>
      <div className="main__content cards">
        <div className="cards__list">
          {state.isLoading ? (
            <Loader />
          ) : (
            <List cards={state.cardsList} openCard={toggleSingleCard} />
          )}
        </div>
        {state.isSingleCardOpened && <Outlet context={{ toggleSingleCard }} />}
      </div>
      {state.pages !== 0 && (
        <Pagination
          pages={state.pages}
          onTogglePage={() => {
            const page = searchParams.get('page') || '1';
            handleFetchPage(page);
          }}
          setSearchParams={setSearchParams}
        />
      )}
    </main>
  );
}
export default MainPage;
