import './card.scss';
import { useNavigate } from 'react-router';
import { MAIN_PAGE_PATH } from '../../constants/constants';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { removeDetailedCard } from '../../redux/slices/cardsSlice';

function Card() {
  const dispatch = useDispatch();
  const { detailedCard } = useSelector((state: RootState) => state.detailedCard);
  const { name, image, gender, species, status } = detailedCard;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';

  const handleClose = () => {
    dispatch(removeDetailedCard());
    navigate(`${MAIN_PAGE_PATH}/?page=${page}`);
  };

  return (
    <div className="modal">
      <div className="cards__card card">
        <div className="card__content card-content">
          <div className="card-content__image">
            <img src={image} alt="" />
          </div>
          <div className="card-content__name">{name}</div>
          <div className="card-content__gender">{gender}</div>
          <div className="card-content__species">{species}</div>
          <div className="card-content__species">{status}</div>
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
  );
}

export default Card;
