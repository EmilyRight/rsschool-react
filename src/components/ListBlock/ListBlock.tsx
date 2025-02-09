import './list-block.scss';
import { TFetchedCards } from '../../types/types';
import PersonCard from '../ListItem/ListItem';

type TListProps = {
  cards: TFetchedCards[] | null;
  openCard: (id: number) => void;
};

function List({ cards, openCard }: TListProps) {
  if (!cards || cards.length === 0) {
    return <div>No cards available</div>;
  }

  return (
    <div className="list-block list">
      {cards?.map(({ id, name, image, species, gender }) => (
        <PersonCard
          key={id}
          id={id}
          name={name}
          image={image}
          species={species}
          gender={gender}
          openCard={openCard}
        />
      ))}
    </div>
  );
}

export default List;
