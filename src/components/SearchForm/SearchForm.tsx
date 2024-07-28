import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './search-form.scss';
import useLocalStorage from '../../hooks/localStorage';
import { useNavigate } from 'react-router';
import Button from '../Button/Button';

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
  useEffect(() => {
    if (storedValue) {
      navigate(`${storedValue}`);
    }
  }, []);
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
        <Button className="input-block__button" type="submit" text="Search" role="search" />
      </form>
    </>
  );
}

export default SearchForm;
