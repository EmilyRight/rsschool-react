import './list-item.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { MAIN_PAGE_PATH } from '../../constants/constants';

type TDetailedCardProps = {
  id: number;
  name: string;
  species: string;
  gender: string;
  image: string;
  openCard: () => void;
};

function PersonCard(props: TDetailedCardProps) {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const { id, name, species, gender, image, openCard } = props;

  return (
    <Link to={`${MAIN_PAGE_PATH}/${id}?page=${page}`} id={`${id}`} onClick={openCard}>
      <div className="list__item item" role="card">
        <div className="item__image">
          <img src={image} alt="" role="img" />
        </div>
        <div className="item__name" role="name">
          {name}
        </div>
        <div className="item__gender" role="gender">
          {gender}
        </div>
        <div className="item__species" role="species">
          {species}
        </div>
      </div>
    </Link>
  );
}

export default PersonCard;
