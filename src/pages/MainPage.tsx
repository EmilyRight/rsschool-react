import React from 'react';
import './main-page.scss';
import SearchForm from '../components/SearchForm/SearchForm';
import List from '../components/ListBlock/ListBlock';
import { TFetchedCardResults } from '../types/types';
import Loader from '../components/Loader/Loader';
import { fetchItems } from '../api/api';

const pageParam = '?page=1';

type TMainPageState = {
  cardsList: TFetchedCardResults[] | null;
  localQuery: string;
  hasError: boolean;
  isLoading: boolean;
};

class MainPage extends React.Component<Record<string, never>, TMainPageState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      cardsList: null,
      localQuery: localStorage.getItem('person') || '',
      hasError: false,
      isLoading: false,
    };
  }

  componentDidMount(): void {
    this.handleFetch(`?name=${this.state.localQuery}`);
  }

  handleFetch = async (param: string | undefined) => {
    this.setState({ isLoading: true });

    try {
      const result = await fetchItems(param);
      const data = result.results;
      this.setState({ cardsList: data, isLoading: false });
    } catch (error) {
      this.setState({ hasError: true, isLoading: false });
      console.log(error);
    }
  };

  handleSubmit = (query?: string | undefined) => {
    const userQuery = query?.trim().replace(/\s/, '').toLowerCase();
    if (userQuery === '') {
      this.handleFetch(pageParam);
    }

    this.handleFetch(`?name=${userQuery}`);
  };

  throwErrorFunction = () => {
    this.setState({ hasError: true, isLoading: false });
  };

  render() {
    const { isLoading, hasError } = this.state;
    if (hasError) {
      throw new Error('Test error');
    }

    return (
      <main className="page__main main">
        <button type="button" className="main__error-btn" onClick={this.throwErrorFunction}>
          Throw Error
        </button>
        <div className="main__input-block">
          <SearchForm onQuerySubmit={this.handleSubmit} />
        </div>
        <div className="main__list">
          {isLoading ? <Loader /> : <List cards={this.state.cardsList} />}
        </div>
      </main>
    );
  }
}
export default MainPage;
