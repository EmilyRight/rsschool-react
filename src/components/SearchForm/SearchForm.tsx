import { ChangeEvent, FormEvent, useState } from 'react';
import './search-form.scss';
import useLocalStorage from '../../hooks/localStorage';
import { useNavigate } from 'react-router';
import Button from '../Button/Button';
import { MAIN_PAGE_PATH } from '../../constants/constants';

type TSearchFormState = {
  query: string | null;
};

function SearchForm() {
  const [storedValue, setValue] = useLocalStorage<string | null>('person');
  const [state, setState] = useState<TSearchFormState>({
    query: storedValue,
  });
  const navigate = useNavigate();

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ query: event.target.value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { query } = state;

    if (!query || query.trim() === '') {
      navigate(`${MAIN_PAGE_PATH}/?page=1`);
      return;
    }

    const trimmedQuery = query.trim().replace(/\s+/g, '').toLowerCase();
    setValue(trimmedQuery);
    setState({ query: trimmedQuery });

    if (!isNaN(Number(trimmedQuery))) {
      navigate(`${MAIN_PAGE_PATH}/${trimmedQuery}`);
    } else {
      navigate(`${MAIN_PAGE_PATH}?name=${trimmedQuery}`);
    }
  };

  return (
    <>
      <form className="input-block" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-block__input"
          placeholder="Enter the name"
          value={state.query || ''}
          name="query"
          onInput={handleInput}
        />
        <Button className="input-block__button" type="submit" text="Search" role="search" />
      </form>
    </>
  );
}

export default SearchForm;
