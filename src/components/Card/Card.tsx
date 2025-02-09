import { useEffect, useState } from 'react';
import './card.scss';
import { OutletContextType, TFetchedCards } from '../../types/types';
import { useNavigate, useOutletContext, useParams } from 'react-router';
import Loader from '../Loader/Loader';
import { MAIN_PAGE_PATH } from '../../constants/constants';
import { useSearchParams } from 'react-router-dom';

type TCardParams = {
  id: string;
};

function Card() {
  const { card, isCardOpened } = useOutletContext<OutletContextType>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id } = useParams<TCardParams>();
  const page = searchParams.get('page') || '1';
  const [isLoading] = useState(false);
  const [detail, setDetail] = useState<TFetchedCards | null>(card);
  const [isOpened, setIsOpened] = useState(isCardOpened);

  const handleClose = () => {
    setIsOpened(false);
    navigate(`${MAIN_PAGE_PATH}?page=${page}`);
  };

  useEffect(() => {
    if (id) {
      setDetail(card);
      setIsOpened(true);
    }
  }, [id, card]);

  useEffect(() => {
    setDetail(card);
    setIsOpened(isCardOpened);
  }, [card, isCardOpened]);

  useEffect(() => {
    setIsOpened(false);
  }, [page]);

  return isLoading ? (
    <Loader />
  ) : (
    isOpened && (
      <div className="card-modal">
        <div className="cards__card card" data-testid="person-card">
          <div className="card__content card-content">
            <div className="card-content__image">
              <img src={detail?.image} alt="" role="img" />
            </div>
            <div className="card-content__name">{detail?.name}</div>
            <div className="card-content__gender">{detail?.gender}</div>
            <div className="card-content__species">{detail?.species}</div>
            <div className="card-content__species">{detail?.status}</div>
          </div>
          <div className="card-content__btn" onClick={handleClose} role="button">
            Close
          </div>
        </div>
      </div>
    )
  );
}

export default Card;
