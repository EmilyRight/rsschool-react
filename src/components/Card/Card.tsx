import { useEffect, useState } from 'react';
import './card.scss';
import { TFetchedCards } from '../../types/types';
import { useNavigate, useParams } from 'react-router';
import { fetchItems } from '../../api/api';
import Loader from '../Loader/Loader';
import { MAIN_PAGE_PATH } from '../../constants/constants';
import { useSearchParams } from 'react-router-dom';

type TCardParams = {
  id: string;
};

function Card() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id } = useParams<TCardParams>();
  const page = searchParams.get('page') || '1';
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState<TFetchedCards | null>(null);
  const [isOpened, setIsOpened] = useState(false);

  const handleClose = () => {
    setIsOpened(false);
    navigate(`${MAIN_PAGE_PATH}?page=${page}`);
  };

  useEffect(() => {
    setIsLoading(true);
    setIsOpened(true);
    const fetchData = async (param: string) => {
      try {
        const result: TFetchedCards = await fetchItems(param);
        setIsLoading(false);
        setDetail(result);
      } catch (error) {
        setIsLoading(false);
        navigate('*');
      }
    };
    if (id) {
      fetchData(`${id}?page=${page}`);
    }
  }, [id]);

  return isLoading ? (
    <Loader />
  ) : (
    isOpened && (
      <div className="card-modal">
        <div className="cards__card card" data-testid="person-card">
          <div className="card__content card-content">
            <div className="card-content__image">
              <img src={detail?.image} alt="" role='img'/>
            </div>
            <div className="card-content__name">{detail?.name}</div>
            <div className="card-content__gender">{detail?.gender}</div>
            <div className="card-content__species">{detail?.species}</div>
            <div className="card-content__species">{detail?.status}</div>
          </div>
          <div className="card-content__btn" onClick={handleClose} role="close-card-btn">
            Close
          </div>
        </div>
      </div>
    )
  );
}

export default Card;
