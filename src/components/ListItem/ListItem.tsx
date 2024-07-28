import './list-item.scss';
import { useGetPersonByIdQuery } from '../../redux/services/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addFavorite, removeFavorite } from '../../redux/slices/favorites';
import { useEffect, useState } from 'react';
import { addDetailedCard } from '../../redux/slices/cardsSlice';
import Loader from '../Loader/Loader';
import { useTheme } from '../../ContextProvider/ContextProvider';



export type TDetailedCardProps = {
  cardId: number;
};

function PersonCard(props: TDetailedCardProps) {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [checked, setChecked] = useState(false);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const { cardId } = props;
  const { data, isLoading } = useGetPersonByIdQuery(String(cardId)) || {};
  const { name, gender, species, image } = data || {};

  const handleFavorites = (cardId: number) => {
    if (favorites.some(fav => fav.id === cardId)) {
      dispatch(removeFavorite(cardId));
      setChecked(false);
    } else {
      if (data) {
        dispatch(addFavorite(data));
        setChecked(true);
      }
    }
  };
  const showDetails = () => {
    console.log('====================================');
    console.log('hey');
    console.log('====================================');
    if (data) {
      dispatch(addDetailedCard(data));
    }
  };

  useEffect(() => {
    console.log('render');

    setChecked(favorites.some(fav => fav.id === cardId));
  }, [favorites, checked]);

  // if (!data) {
  //   return <div>No data available</div>;
  // }

  return isLoading ? (
    <Loader />
  ) : (
    <div className={`list__item item item_${theme}`} role="card">
      <div className="item__content content">
        <div className="content__image">
          <img src={image} alt="image" role="img" />
        </div>
        <div className="content__text content__name" role="name">
          {name}
        </div>
        <div className="content__text content__gender" role="gender">
          {gender}
        </div>
        <div className="content__text content__species" role="species">
          {species}
        </div>
      </div>
      <div className="item__footer">
        <form className="item__input">
          <input
            className="item__add-btn"
            type="checkbox"
            id="add-to-favs"
            name="add-to-favs"
            checked={checked}
            onChange={() => handleFavorites(cardId)}
          ></input>
          <label htmlFor="add-to-favs">{checked ? 'Unselect' : 'Select'}</label>
        </form>
        <div className="more__btn" onClick={showDetails} role="more-btn">
          More...
        </div>
      </div>
    </div>
  );
}

export default PersonCard;
