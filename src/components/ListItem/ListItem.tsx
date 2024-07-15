import './list-item.scss';
import { TCardProps } from '../../types/types';
import { useNavigate } from 'react-router-dom';

function PersonCard(props: TCardProps) {
  const { id, name, species, gender, image } = props;
  const navigate = useNavigate();
  const handleItemClick = (id: number) => {
    navigate(`/${id}`);
  };

  return (
    <div className="list__item item" id={`${id}`} onClick={() => handleItemClick(id)}>
      <div className="item__image">
        <img src={image} alt="" />
      </div>
      <div className="item__name">{name}</div>
      <div className="item__gender">{gender}</div>
      <div className="item__species">{species}</div>
    </div>
  );
}

export default PersonCard;
