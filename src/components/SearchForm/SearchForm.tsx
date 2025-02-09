import { ChangeEvent, FormEvent, useState } from 'react';
import './search-form.scss';
import useLocalStorage from '../../hooks/localStorage';

type TSearchFormProps = {
  onQuerySubmit: (query: string) => void;
};

function SearchForm({ onQuerySubmit }: TSearchFormProps) {
  const [storedValue, setStoredValue] = useLocalStorage<string>('person');
  const [query, setQuery] = useState(storedValue || '');

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    const value = element.value;
    setQuery(value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query && query !== null) {
      setStoredValue(query.toLowerCase());
      onQuerySubmit(query);
    } else {
      setStoredValue('');
      onQuerySubmit('');
    }
  };

  return (
    <>
      <form className="input-block" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-block__input"
          placeholder="Enter the name"
          value={query}
          name="query"
          onInput={handleInput}
        />
        <button className="input-block__button" type="submit" role="button">
          Search
        </button>
      </form>
    </>
  );
}

export default SearchForm;
