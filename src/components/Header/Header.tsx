import './header.scss';
import Pagination from '../Pagination/Pagination';
import Button from '../Button/Button';

import SearchForm from '../SearchForm/SearchForm';
import { useTheme } from '../../ContextProvider/ContextProvider';


function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header" role="header">
      <div className="header__container container">
        <div className="header__theme-controls theme">
          <Button
            text={theme === 'dark' ? 'light' : 'dark'}
            action={toggleTheme}
            className="theme__btn"
            role="theme"
          />
          <div className="theme__text">Switch theme</div>
        </div>
        <div className="header__input-block">
          <SearchForm />
        </div>
        <Pagination />
      </div>
    </header>
  );
}

export default Header;
