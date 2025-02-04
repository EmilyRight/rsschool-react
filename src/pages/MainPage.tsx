import React from 'react';
import './main-page.scss';
import SearchForm from '../components/SearchForm/SearchForm';
import List from '../components/ListBlock/ListBlock';
import { TFetchedCardResults, TFetchedCards } from '../types/types';
import Loader from '../components/Loader/Loader';
import { fetchItems } from '../api/api';

const pageParam = '?page=1';

type TMainPageState = {
  cardsList: TFetchedCards[] | null;
  localQuery: string;
  hasError: boolean;
  isLoading: boolean;
  isNotFound: boolean;
};

class MainPage extends React.Component<Record<string, never>, TMainPageState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      cardsList: null,
      localQuery: localStorage.getItem('person') || '',
      hasError: false,
      isLoading: false,
      isNotFound: false,
    };
  }
  handleFetch = async (param: string | undefined, person?: string | undefined) => {
    this.setState({ isLoading: true, isNotFound: false });
    try {
      const results: TFetchedCardResults = await fetchItems(param);
      if (param) {
        const data = results.results;
        this.setState({ cardsList: data, isLoading: false });
        if (person) localStorage.setItem('person', person);
      }
    } catch (error) {
      this.setState({ isNotFound: true, isLoading: false });
    }
  };

  componentDidMount(): void {
    this.handleFetch(`?name=${this.state.localQuery}`, this.state.localQuery);
  }

  handleSubmit = (query?: string | undefined) => {
    const userQuery = query?.trim().replace(/\s/, '').toLowerCase();
    if (userQuery === '') {
      this.handleFetch(pageParam);
    }

    this.handleFetch(`?name=${userQuery}`, userQuery);
  };

  throwErrorFunction = () => {
    this.setState({ hasError: true, isLoading: false });
  };

  render() {
    const { isLoading, hasError, isNotFound } = this.state;
    if (hasError) {
      throw new Error('Test error');
    }

    return (
      <main className='page__main main'>
        <button type='button' className='main__error-btn' onClick={this.throwErrorFunction}>
          Throw Error
        </button>
        <div className='main__input-block'>
          <SearchForm onQuerySubmit={this.handleSubmit} />
        </div>
        <div className='main__list'>
          {isLoading && !isNotFound ? (
            <Loader />
          ) : isNotFound && !isLoading ? (
            <div className='empty'> There's nothing here :(</div>
          ) : (
            <List cards={this.state.cardsList} />
          )}
        </div>
      </main>
    );
  }
}
export default MainPage;
