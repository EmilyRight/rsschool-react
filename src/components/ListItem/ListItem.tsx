import './list-item.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { MAIN_PAGE_PATH } from '../../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addFavorite, removeFavorite } from '../../redux/slices/favorites';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { addDetailedCard } from '../../redux/slices/cardsSlice';
import { useGetPersonByIdQuery } from '../../redux/services/api';
import Loader from '../Loader/Loader';

type TDetailedCardProps = {
  cardId: number;
};

function PersonCard(props: TDetailedCardProps) {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [checked, setChecked] = useState(false);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const { cardId } = props;
  const { data, isLoading } = useGetPersonByIdQuery(cardId);

  const page = searchParams.get('page') || '1';

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
    if (data) {
      dispatch(addDetailedCard(data));
    }
  };

  useEffect(() => {
    console.log('render');

    setChecked(favorites.some(fav => fav.id === cardId));
  }, [favorites, checked]);

  return isLoading ? (
    <Loader />
  ) : (
    <Link
      to={`${MAIN_PAGE_PATH}/${cardId}?page=${page}`}
      id={`${cardId}`}
      className="list__item item"
      role="card"
    >
      <div className="item__content content">
        <div className="content__image">
          <img src={data?.image} alt="" role="img" />
        </div>
        <div className="content__text content__name" role="name">
          {data?.name}
        </div>
        <div className="content__text content__gender" role="gender">
          {data?.gender}
        </div>
        <div className="content__text content__species" role="species">
          {data?.species}
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
        <div className="more__btn" onClick={showDetails}>
          More...
        </div>
      </div>
    </Link>
  );
}

export default PersonCard;
