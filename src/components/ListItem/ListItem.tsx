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
  const { id, name, species, gender, image, openCard } = props;
  const page = searchParams.get('page') || '1';

  return (
    <Link
      to={`${MAIN_PAGE_PATH}/${id}?page=${page}`}
      className="list__item item"
      id={`${id}`}
      onClick={openCard}
    >
      <div className="item__image">
        <img src={image} alt="" />
      </div>
      <div className="item__name">{name}</div>
      <div className="item__gender">{gender}</div>
      <div className="item__species">{species}</div>
    </Link>
  );
}

export default PersonCard;
