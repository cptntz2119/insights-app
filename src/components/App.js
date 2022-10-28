import React, { Component } from "react";
import DogList from "./DogList";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { DragDropContext } from "react-beautiful-dnd";
import { sort } from "../actions";
import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

class App extends Component {
  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    //display the alert window
    if (
      this.props.lists[0].cards.length === 1 ||
      this.props.lists[1].cards.length === 1
    ) {
      window.alert("Woof Invalid Action Woof.");
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      )
    );
  };

  render() {
    const { lists } = this.props;

    return (
      <div className="outter-container">
        <div className="table-container">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div>
              <h2>Insights Assess</h2>
              <ListContainer>
                {lists.map((list, index) => (
                  <DogList
                    listID={list.id}
                    key={index}
                    title={list.title}
                    cards={list.cards}
                  />
                ))}
              </ListContainer>
            </div>
          </DragDropContext>
        </div>
        <div className="button-container">
          <Button
            id="export-button"
            variant="contained"
            color="primary"
            onClick={() => {
              const mydata = lists;
              let div = document.getElementById("display");
              for (var i = 0; i < mydata.length; i++) {
                div.innerHTML =
                  div.innerHTML +
                  "<p " +
                  ">" +
                  mydata[i].title +
                  "&nbsp" +
                  mydata[i].cards +
                  "</p>" +
                  "<br>";
              }
            }}
          >
            Export Tables
          </Button>
          <div id="display"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  lists: state.lists,
});

export default connect(mapStateToProps)(App);
