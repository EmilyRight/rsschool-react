import React from 'react';

import './list-block.scss';
import { TFetchedCardResults } from '../../types/types';
import { PersonCard } from '../ListItem/ListItem';
type TListProps = {
  cards: TFetchedCardResults[] | null;
};

class List extends React.Component<TListProps> {
  render() {
    const { cards } = this.props;
    // const { results } = cards;
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
