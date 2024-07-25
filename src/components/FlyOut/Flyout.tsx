import './flyout.scss';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import { clearFavorites } from '../../redux/slices/favorites';
import { RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
function Flyout() {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state: RootState) => state.favorites);
  const [visible, setVisible] = useState(favorites.length > 0);

  const handleUnselect = () => {
    dispatch(clearFavorites());
    setVisible(false);
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
    saveAs(blob, `${favorites.length}__items.csv`);
  };
  useEffect(() => {
    if (favorites.length > 0) {
      setVisible(true);
    }
  }, [favorites.length]);
  return (
    <div className={`page__flyout flyout ${visible ? 'visible' : ''}`}>
      <div className="flyout__text">{favorites.length} item(s) are selected</div>
      <div className="flyout__btns btn-list">
        <Button
          text={'Unselect all'}
          className={`btn ${favorites.length === 0 && 'disabled'}`}
          action={handleUnselect}
        />
        <Button
          text={'Download'}
          className={`btn ${favorites.length === 0 && 'disabled'}`}
          action={handleDownload}
        />
      </div>
    </div>
  );
}

export default Flyout;
