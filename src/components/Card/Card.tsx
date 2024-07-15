import { useEffect, useState } from 'react';
import './card.scss';
import { TFetchedCardResults } from '../../types/types';
import { useNavigate, useParams } from 'react-router';
import { fetchItems } from '../../api/api';
import Loader from '../Loader/Loader';

type TCardParams = {
  id: string;
};

type TCardState = {
  isLoading: boolean;
  detail: TFetchedCardResults | null;
};

function Card() {
  const { id } = useParams<TCardParams>();
  const navigate = useNavigate();
  const [state, setState] = useState<TCardState>({
    isLoading: false,
    detail: null,
  });

  const handleClose = () => {
    navigate('/');
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
    <div className="card">
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
