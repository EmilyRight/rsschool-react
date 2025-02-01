import React from 'react';

import './list-block.scss';
import { TFetchedCards } from '../../types/types';
import { PersonCard } from '../ListItem/ListItem';
type TListProps = {
  cards: TFetchedCards[] | null;
};

class List extends React.Component<TListProps> {
  render() {
    const { cards } = this.props;
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
          />
        ))}
      </div>
    );
  }
}

export default List;
