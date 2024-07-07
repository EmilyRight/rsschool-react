import React, { ChangeEvent, FormEvent } from "react";
import "./search-form.scss";

type TSearchFormProps = {
  onQuerySubmit: (query: string) => void;
};

type TSearchFormState = {
  query: string;
};

class SearchForm extends React.Component<TSearchFormProps, TSearchFormState> {
  constructor(props: TSearchFormProps) {
    super(props);
    this.state = {
      query: localStorage.getItem("person") || "",
    };
  }
  componentDidMount(): void {
    this.setInitialQuery();
  }

  setInitialQuery() {
    const { query } = this.state;
    const { onQuerySubmit } = this.props;
    onQuerySubmit(query);
  }

  handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    const value = element.value;
    this.setState({ query: value });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const regex = /^[1-9]$/;
    const { query } = this.state;
    const { onQuerySubmit } = this.props;
    if (regex.test(query)) {
      localStorage.setItem("person", `${query}`);
      onQuerySubmit(query);
      this.setState({ query: "" });
    }
  };

  render() {
    const { query } = this.state;

    return (
      <>
        <form className="input-block" onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="input-block__input"
            placeholder="Enter person name"
            value={query}
            name="query"
            onChange={this.handleInput}
          />
          <button className="input-block__button" type="submit">
            Search
          </button>
        </form>
      </>
    );
  }
}

export default SearchForm;
