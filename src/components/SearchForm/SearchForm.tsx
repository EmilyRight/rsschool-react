import { ChangeEvent, FormEvent, useState } from 'react';
import './search-form.scss';
import useLocalStorage from '../../hooks/localStorage';

type TSearchFormState = {
  query: string | null;
};

function SearchForm() {
  const [storedValue, setStoredValue] = useLocalStorage<string>('person');
  const [state, setState] = useState<TSearchFormState>({
    query: storedValue,
  });

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    const value = element.value;
    setState({ query: value });
    console.log(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { query } = state;

    if (query && query !== null) {
      console.log('handleSubmit', query);
      setStoredValue(query);
    } else {
      setStoredValue('');
    }
  };

  return (
    <>
      <form className="input-block" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-block__input"
          placeholder="Enter number from 1 to 826"
          value={state.query || ''}
          name="query"
          onChange={handleInput}
        />
        <button className="input-block__button" type="submit" role="search-btn">
          Search
        </button>
      </form>
    </>
  );
}

export default SearchForm;
