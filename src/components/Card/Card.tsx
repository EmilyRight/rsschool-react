import './card.scss';
import { useNavigate, useParams } from 'react-router';
import { MAIN_PAGE_PATH } from '../../constants/constants';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { removeDetailedCard } from '../../redux/slices/cardsSlice';
import { useEffect } from 'react';

function Card() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  const { detailedCard } = useSelector((state: RootState) => state.detailedCard);
  const { name, image, gender, species, status } = detailedCard;
  const { id } = useParams();
  const handleClose = async () => {
    const newUrl = `${MAIN_PAGE_PATH}/${id ? id : ''}${page ? `?page=${page}` : ''}`;
    navigate(newUrl);
    console.log('New URL in handleClose Card:', newUrl);
    dispatch(removeDetailedCard());
  };

  useEffect(() => {}, [detailedCard]);

  return (
    detailedCard && (
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
    )
  );
}

export default Card;
