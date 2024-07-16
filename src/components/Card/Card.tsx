import { useEffect, useState } from 'react';
import './card.scss';
import { TFetchedCardResults } from '../../types/types';
import { useNavigate, useOutletContext, useParams } from 'react-router';
import { fetchItems } from '../../api/api';
import Loader from '../Loader/Loader';
import { MAIN_PAGE_PATH } from '../../constants/constants';
import { useSearchParams } from 'react-router-dom';

type TCardParams = {
  id: string;
};

type TCardState = {
  isLoading: boolean;
  detail: TFetchedCardResults | null;
};

interface OutletContext {
  toggleSingleCard: () => void;
}

function Card() {
  const { id } = useParams<TCardParams>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const [state, setState] = useState<TCardState>({
    isLoading: false,
    detail: null,
  });
  const { toggleSingleCard } = useOutletContext<OutletContext>();
  console.log('render card');

  const handleClose = () => {
    toggleSingleCard();
    navigate(`${MAIN_PAGE_PATH}/?page=${page}`);
  };

  useEffect(() => {
    setState({ ...state, isLoading: true });
    const fetchData = async (param: string) => {
      try {
        const result: TFetchedCardResults = await fetchItems(param);
        setState({ ...state, isLoading: false, detail: result });
      } catch (error) {
        setState({ ...state, isLoading: false });
        navigate('*');
        throw new Error();
      }
    };
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return state.isLoading ? (
    <Loader />
  ) : (
    <div className="cards__card card">
      <div className="card__content card-content">
        <div className="card-content__image">
          <img src={state.detail?.image} alt="" />
        </div>
        <div className="card-content__name">{state.detail?.name}</div>
        <div className="card-content__gender">{state.detail?.gender}</div>
        <div className="card-content__species">{state.detail?.species}</div>
        <div className="card-content__species">{state.detail?.status}</div>
      </div>
      <div className="card-content__btn" onClick={handleClose}>
        Close
      </div>
    </div>
  );
}

export default Card;
