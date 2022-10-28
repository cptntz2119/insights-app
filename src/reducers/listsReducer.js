import { CONSTANTS } from "../actions";

const initialState = [];

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.GET_DOGS:
      return [
        {
          title: "table 1",
          id: `1`,
          cards: action.payload.slice().splice(0, 10),
        },
        {
          title: "table 2",
          id: `2`,
          cards: action.payload.slice().splice(10, 20),
        },
      ];

    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId,
        type,
      } = action.payload;
      const newState = [...state];
      console.log(type);

      // dragging lists around
      if (type === "list") {
        const list = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...list);
        return newState;
      }

      // in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find((list) => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      // other list
      if (droppableIdStart !== droppableIdEnd) {
        // find the list where drag happened
        const listStart = state.find((list) => droppableIdStart === list.id);

        // pull out the card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1);

        // find the list where drag ended
        const listEnd = state.find((list) => droppableIdEnd === list.id);

        // put the card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }

      return newState;

    default:
      return state;
  }
};

export default listsReducer;
