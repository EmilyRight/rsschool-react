import './list-block.scss';
import PersonCard from '../ListItem/ListItem';
import { TCard } from '../../types/types';
import { useTheme } from '../../ContextProvider/ContextProvider';

type TListProps = {
  cardsList: TCard[] | undefined;
};
function List(props: TListProps) {
  const { cardsList } = props;
  const { theme } = useTheme();

  return cardsList?.length === 0 ? (
    <div>No cards available</div>
  ) : (
    <div
      className={`list-block list list_${theme} ${cardsList && cardsList?.length > 1 ? 'long' : 'short'}`}
    >
      {cardsList?.map(item => <PersonCard key={item?.id} cardId={item?.id} />)}
    </div>
  );
}

export default List;
