import React from "react";
import { PersonCard } from "../ListItem/ListItem";
import "./list-block.scss";
type TSearchFormProps = {
  query: string;
};

class List extends React.Component {
  constructor(props: TSearchFormProps) {
    super(props);
    this.state = {
      query: "",
    };
  }

  render() {
    return (
      <>
        <div className="list-block list">
          <PersonCard
            id={1}
            name={"Rick Sanchez"}
            species={"Human"}
            gender={"Male"}
            image={"https://rickandmortyapi.com/api/character/avatar/1.jpeg"}
          />
          <PersonCard
            id={1}
            name={"Rick Sanchez"}
            species={"Human"}
            gender={"Male"}
            image={"https://rickandmortyapi.com/api/character/avatar/1.jpeg"}
          />
          <PersonCard
            id={1}
            name={"Rick Sanchez"}
            species={"Human"}
            gender={"Male"}
            image={"https://rickandmortyapi.com/api/character/avatar/1.jpeg"}
          />
        </div>
      </>
    );
  }
}

export default List;
