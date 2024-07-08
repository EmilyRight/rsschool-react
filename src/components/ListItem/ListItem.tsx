import { Component } from 'react';
import './list-item.scss';
import { TCardProps } from '../../types/types';

export class PersonCard extends Component<TCardProps> {
  constructor(props: TCardProps) {
    super(props);
  }
  render() {
    const { id, name, species, gender, image } = this.props;
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
}
