import './header.scss';
import Pagination from '../Pagination/Pagination';
import Button from '../Button/Button';
import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';

type THeaderState = {
  hasError: boolean;
};
function Header() {
  const [state, setState] = useState<THeaderState>({
    hasError: false,
  });

  if (state.hasError) {
    throw new Error('test error');
  }
  const throwErrorFunction = () => {
    setState(prevState => ({ ...prevState, hasError: true }));
  };

  return (
    <header className="header">
      <div className="container">
        <Button text="Throw Error" action={throwErrorFunction} className="error-button" />
        <div className="header__input-block">
          <SearchForm />
        </div>
        <Pagination />
      </div>
    </header>
  );
}

export default Header;
