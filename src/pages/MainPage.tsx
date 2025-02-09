import { useEffect, useState } from 'react';
import './main-page.scss';
import SearchForm from '../components/SearchForm/SearchForm';
import List from '../components/ListBlock/ListBlock';
import { TFetchedCardResults, TFetchedCards } from '../types/types';
import Loader from '../components/Loader/Loader';
import { fetchItems } from '../api/api';
import Pagination from '../components/Pagination/Pagination.tsx';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import useLocalStorage from '../hooks/localStorage.tsx';

function MainPage() {
  const navigate = useNavigate();

  const [cardsList, setCardList] = useState<TFetchedCards[] | []>([]);
  const [pages, setPages] = useState(0);
  const [error, setError] = useState(false);
  const [isNewSearch, setIsNewSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotfound] = useState(false);
  const [storedValue, setStoredValue] = useLocalStorage<string>('person');
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  if (error) {
    throw new Error('test error');
  }

  const throwErrorFunction = () => {
    setError(true);
  };

  const handleCardClick = (id: number) => {
    navigate(`${id}?page=${page}`);
  };

  const handleFetch = async (param: string | undefined, person?: string) => {
    setIsLoading(true);

    try {
      const results: TFetchedCardResults = await fetchItems(param);
      if (param) {
        const data = results.results;
        const { pages } = results.info;
        setCardList(data);
        setPages(pages);
        setIsLoading(false);
        setIsNotfound(false);
        if (person) setStoredValue(person);
      }
    } catch (error) {
      setIsNotfound(true);
      setIsLoading(false);
    }
  };

  const handleFetchPage = (page: string) => {
    const pageParam =
      storedValue && storedValue !== '' ? `?name=${storedValue}&page=${page}` : `?page=${page}`;

    handleFetch(pageParam);
  };

  const handleSubmit = (query?: string | null) => {
    setIsNewSearch(true);
    const userQuery = query?.trim().replace(/\s/, '').toLowerCase();
    if (userQuery && userQuery !== '') {
      handleFetch(`?name=${userQuery}`, userQuery);
    } else {
      const page = searchParams.get('page') || '1';
      handleFetch(`?page=${page}`);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const page = searchParams.get('page') || '1';

      if (storedValue && storedValue !== '') {
        await handleFetch(`?name=${storedValue}&page=${page}`);
      } else {
        await handleFetch(`?page=${page}`);
      }
    };

    fetchInitialData();
  }, [searchParams]);

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
          {isLoading && !isNotFound ? (
            <Loader />
          ) : isNotFound && !isLoading ? (
            <div className="empty"> There's nothing here </div>
          ) : (
            <List cards={cardsList} openCard={handleCardClick} />
          )}
        </div>
        <Outlet context={{ handleCardClick }} />
      </div>
      {pages !== 0 && !isNotFound && (
        <Pagination
          pages={pages}
          onTogglePage={handleFetchPage}
          setSearchParams={setSearchParams}
          isNewSearch={isNewSearch}
        />
      )}
    </main>
  );
}
export default MainPage;
