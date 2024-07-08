import React from 'react';
import './main-page.scss';
import SearchForm from '../components/SearchForm/SearchForm';
import List from '../components/ListBlock/ListBlock';
import { Card, TFetchedCard, TFetchedCardResults } from '../types/types';
import Loader from '../components/Loader/Loader';

const pageParam = '?page=1';

type TMainPageProps = {
  url: string;
};
type TMainPageState = {
  cardsList: Card[];
  localQuery: string;
  hasError: boolean;
  isLoading: boolean;
};

class MainPage extends React.Component<TMainPageProps, TMainPageState> {
  constructor(props: TMainPageProps) {
    super(props);
    this.state = {
      cardsList: [],
      localQuery: localStorage.getItem('person') || '',
      hasError: false,
      isLoading: false,
    };
  }

  componentDidMount(): void {
    this.fetchData(this.state.localQuery);
  }

  fetchData = async (param: string | undefined) => {
    const { url } = this.props;
    this.setState({ isLoading: true });
    const response = await fetch(`${url}/${param}`, {
      method: 'GET',
    });

    // const numberParam = Number(param);
    // if (param && (numberParam < 1 || numberParam > 826)) {
    //   this.setState({ hasError: true });
    //   console.log('Invalid parameter. Please enter a valid number');
    //   return;
    // }

    // if (!response.ok) {
    //   this.setState({ hasError: true });
    //   throw new Error('Network response was not ok');
    // }
    if (response.ok) {
      this.setState({ isLoading: false });
      try {
        if (param?.match(/^(?:[1-9]|[1-9][0-9]|[1-7][0-9]{2}|8[0-1][0-9]|82[0-6])$/)) {
          const fetchedCards: TFetchedCardResults = await response.json();
          const newArr = [fetchedCards].map(({ id, name, species, image, gender }) => {
            return { id, name, species, image, gender };
          });
          this.setState({ cardsList: [...newArr] });
          localStorage.setItem('person', `${param}`);
        } else {
          const fetchedCards: TFetchedCard = await response.json();
          const cardsArray = fetchedCards.results;
          cardsArray.map(({ id, name, species, image, gender }) => {
            return { id, name, species, image, gender };
          });
          this.setState({ cardsList: [...cardsArray] });
        }
      } catch (error) {
        this.setState({ hasError: true });
        console.log(error);
      }
    }
  };

  handleSubmit = (query?: string | undefined) => {
    const userQuery = query?.trim().replace(/\s/, '');
    if (userQuery === '') {
      this.fetchData(pageParam);
    }

    this.fetchData(userQuery);
  };

  throwErrorFunction = () => {
    this.setState({ hasError: true, isLoading: false });
    console.log('====================================');
    console.log('error');
    console.log('====================================');
  };

  render() {
    const { isLoading } = this.state;
    return (
      <main className="page__main main">
        <button type="button" onClick={this.throwErrorFunction}>
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
