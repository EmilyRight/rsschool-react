import './flyout.scss';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import { clearFavorites } from '../../redux/slices/favorites';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import { useTheme } from '../../ContextProvider/ContextProvider';

type TState = {
  visible: boolean;
  url: string;
};
function Flyout() {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const { favorites } = useSelector((state: RootState) => state.favorites);
  const [state, setState] = useState<TState>({
    visible: favorites.length > 0,
    url: '',
  });

  const handleUnselect = () => {
    dispatch(clearFavorites());
    setState({ ...state, visible: false });
  };

  const handleDownload = () => {
    if (favorites.length === 0) return;
    const titleKeys = Object.keys(favorites[0]);
    const refinedData = [titleKeys];
    favorites.forEach(item => {
      refinedData.push(
        Object.values(item).map(value => {
          if (typeof value === 'object') {
            return JSON.stringify(value);
          }
          return String(value);
        }),
      );
    });
    let csvContent = '';
    refinedData.forEach(row => {
      csvContent += row.join(';') + '\n';
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    setState({ ...state, url });
  };

  useEffect(() => {
    if (favorites.length > 0) {
      setState({ ...state, visible: true });
    } else {
      setState({ ...state, visible: false });
    }
  }, [favorites.length]);

  return (
    <div className={`page__flyout flyout ${state.visible ? 'visible' : ''}`}>
      <div className="flyout__text">{favorites.length} item(s) are selected</div>
      <div className="flyout__btns btn-list">
        <Button
          text={'Unselect all'}
          className={`btn ${favorites.length === 0 && 'disabled'}`}
          action={handleUnselect}
        />
        <a
          className={`btn btn_${theme} ${favorites.length === 0 && 'disabled'}`}
          href={state.url}
          download={`${favorites.length}__persons.csv`}
          onClick={handleDownload}
        >
          Download
        </a>
      </div>
    </div>
  );
}

export default Flyout;
