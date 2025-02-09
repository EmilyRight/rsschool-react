import './list-item.scss';

type TDetailedCardProps = {
  id: number;
  name: string;
  species: string;
  gender: string;
  image: string;
  openCard: (id: number) => void;
};

function PersonCard(props: TDetailedCardProps) {
  const { id, name, species, gender, image, openCard } = props;

  return (
    <div className="list__item item" role="card" onClick={() => openCard(id)}>
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
  );
}

export default PersonCard;
