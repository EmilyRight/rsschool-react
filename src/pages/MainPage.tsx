import { useEffect, useState } from 'react';
import './main-page.scss';
import SearchForm from '../components/SearchForm/SearchForm';
import List from '../components/ListBlock/ListBlock';
import { TFetchedCardResults } from '../types/types';
import Loader from '../components/Loader/Loader';
import { fetchItems } from '../api/api';
import mockData from '../mock/mockData.ts';

const pageParam = '?page=1';

type TMainPageState = {
  cardsList: TFetchedCardResults[] | null;
  hasError: boolean;
  isLoading: boolean;
};
function MainPage() {
  const [state, setState] = useState<TMainPageState>({
    cardsList: [],
    hasError: false,
    isLoading: false,
  });
  const localQuery = localStorage.getItem('person') || '';
  // componentDidMount(): void {
  //   this.handleFetch(this.state.localQuery);
  // }

  const handleFetch = async (param: string | undefined) => {
    setState({ ...state, isLoading: true });

    try {
      // const result = await fetchItems(param);
      // const result = mockData;
      // let data: TFetchedCardResults[];
      // console.log('====================================');
      // console.log(result);
      // console.log('====================================');
      // if (param) {
      //   data = [...result];
      // }

      const { results } = mockData;
      // else {
      //   data = result.results;
      // }
      setState({ ...state, cardsList: results, isLoading: false });
    } catch (error) {
      setState({ ...state, hasError: true, isLoading: false });
      console.log(error);
    }
  };

  const handleSubmit = (query?: string | undefined) => {
    const userQuery = query?.trim().replace(/\s/, '');
    if (userQuery === '') {
      handleFetch(pageParam);
    }

    handleFetch(userQuery);
  };

  const throwErrorFunction = () => {
    setState({ ...state, hasError: true, isLoading: false });
  };

  useEffect(() => {
    if (state.hasError) {
      throw new Error('test error');
    }

    localQuery ? handleFetch(localQuery) : handleFetch('');
  }, []);

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
    </main>
  );
}
export default MainPage;
