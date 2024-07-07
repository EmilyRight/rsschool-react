import React from "react";
import "./App.scss";
import SearchForm from "./components/SearchForm/SearchForm";
import List from "./components/ListBlock/ListBlock";
import { Card } from "./components/ListItem/ListItem";
import { TFetchedCard } from "./types/types";
const pageParam = "?page=1";
type TAppProps = {
  url: string;
};
type TAppState = {
  cardsList: Card[];
};

class App extends React.Component<TAppProps, TAppState> {
  constructor(props: TAppProps) {
    super(props);
    this.state = {
      cardsList: [],
    };
  }

  fetchData = async (param: string) => {
    const { url } = this.props;
    try {
      const response = await fetch(`${url}/${param}`, {
        method: "GET",
      });
      if (param === pageParam) {
        const fetchedCards: TFetchedCard = await response.json();
        const cardsArray = [...fetchedCards.results];
        console.log(cardsArray);
        this.setState({ cardsList: [...cardsArray] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleSubmit = (query?: string) => {
    const userQuery = query?.trim().replace(/\s/, "");
    if (userQuery) {
      this.fetchData(userQuery);
    } else {
      this.fetchData("?page=1");
    }
  };

  render() {
    return (
      <div className="page">
        <main className="page__main main">
          <div className="main__input-block">
            <SearchForm onQuerySubmit={this.handleSubmit} />
          </div>
          <div className="main__list">
            <List />
          </div>
        </main>
      </div>
    );
  }
}
export default App;
