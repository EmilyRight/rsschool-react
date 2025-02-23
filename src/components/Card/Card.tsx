import './card.scss';
import { useNavigate } from 'react-router';
import { MAIN_PAGE_PATH } from '../../constants/constants';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { removeDetailedCard } from '../../redux/slices/cardsSlice';
import { useTheme } from '../../ContextProvider/ContextProvider';

function Card() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [searchParams] = useSearchParams();
  console.log(window.location.href);

  const page = searchParams.get('page');
  const queryName = searchParams.get('name');
  const { detailedCard } = useSelector((state: RootState) => state.detailedCard);

  const getRedirectUrl = () => {
    const params = new URLSearchParams();

    if (queryName) params.set('name', queryName);
    if (page) params.set('page', page);

    return `${MAIN_PAGE_PATH}${params.toString() ? `?${params.toString()}` : ''}`;
  };

  const handleClose = async () => {
    navigate(getRedirectUrl());
    dispatch(removeDetailedCard());
  };

  return (
    detailedCard && (
      <div className="modal">
        <div className={`cards__card card card_${theme}`} role="card">
          <div className="card__content card-content">
            <div className="card-content__image">
              <img src={detailedCard.image} alt="" />
            </div>
            <div className="card-content__name">{detailedCard.name}</div>
            <div className="card-content__gender">{detailedCard.gender}</div>
            <div className="card-content__species">{detailedCard.species}</div>
            <div className="card-content__species">{detailedCard.status}</div>
          </div>
          <div
            className="card-content__btn"
            onClick={() => {
              handleClose();
            }}
            role="close-card-btn"
          >
            Close
          </div>
        </div>
      </div>
    )
  );
}

export default Card;
