import './list-block.scss';
import PersonCard from '../ListItem/ListItem';
import { TCard } from '../../types/types';

type TListProps = {
  cardsList: TCard[] | undefined;
};
function List(props: TListProps) {
  const { cardsList } = props;

  return (
    <div className="list-block list">
      {cardsList?.map(item => <PersonCard key={item.id} cardId={item.id} />)}
    </div>
  );
}

export default List;
