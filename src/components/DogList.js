import React, { useEffect } from "react";
import DogCard from "./DogCard";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchDogs } from "../actions/listsActions";

const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  height: 100%;
  margin-right: 8px;
`;

const DogList = ({ title, cards, listID }) => {
  useEffect(() => {
    fetchDogs();
  }, []);

  return (
    <div className="lists-container">
      <Droppable droppableId={String(listID)}>
        {(provided) => (
          <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
            <h3>{title}</h3>
            {cards.map((card, index) => (
              <DogCard key={index} index={index} text={card} id={index} />
            ))}
            {provided.placeholder}
          </ListContainer>
        )}
      </Droppable>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dogData: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDogs: () => dispatch(fetchDogs()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DogList);
