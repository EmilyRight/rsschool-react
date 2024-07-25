import { ChangeEvent, FormEvent, useState } from 'react';
import './search-form.scss';
import useLocalStorage from '../../hooks/localStorage';
import { useNavigate } from 'react-router';

type TSearchFormState = {
  query: string | null;
};

function SearchForm() {
  const [storedValue, setValue] = useLocalStorage<string | null>('person');
  const navigate = useNavigate();
  const [state, setState] = useState<TSearchFormState>({
    query: storedValue,
  });

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const element = event.target as HTMLInputElement;
    const value = element.value;
    setState({ query: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { query } = state;
    setValue(query);
    setState({ query: '' });
    navigate(`${query}`);
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
