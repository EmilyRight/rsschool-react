
import './list-item.scss';
import { TCardProps } from '../../types/types';

function PersonCard(props: TCardProps) {
  const { id, name, species, gender, image } = props;
  return (
    <div className="list__item item" id={`${id}`}>
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
