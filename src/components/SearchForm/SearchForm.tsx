import React, { ChangeEvent, FormEvent, useState } from 'react';
import './search-form.scss';

type TSearchFormProps = {
  onQuerySubmit: (query: string) => void;
};

type TSearchFormState = {
  query: string;
};

function SearchForm(props: TSearchFormProps) {
  const [state, setState] = useState<TSearchFormState>({
    query: localStorage.getItem('person') || '',
  });

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    const value = element.value;
    setState({ query: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { query } = state;
    const { onQuerySubmit } = props;
    localStorage.setItem('person', query);
    onQuerySubmit(query);
  };

  return (
    <>
      <form className="input-block" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-block__input"
          placeholder="Enter number from 1 to 826"
          value={state.query}
          name="query"
          onChange={handleInput}
        />
        <button className="input-block__button" type="submit">
          Search
        </button>
      </form>
    </>
  );
}

export default SearchForm;
