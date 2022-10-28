import { CONSTANTS } from "../actions";
import axios from "axios";

export const fetchDogs = () => {
  return (dispatch) => {
    axios
      .get("https://dog.ceo/api/breeds/list/all")
      .then((response) => {
        const dogs = randomUniqTen(Object.keys(response.data.message));
        // console.log("dogs in actions", dogs);
        dispatch(getList(dogs));

        // const dogs = randomUniqTen(Object.keys(response.data.message));

        // const middleIndex = Math.ceil(dogs.length / 2);

        // const firstHalf = dogs.slice().splice(0, middleIndex);
        // const secondHalf = dogs.slice().splice(-middleIndex);

        // dispatch(getList(firstHalf, secondHalf));
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };
};

const randomUniqTen = (arr) => {
  const uniqSet = new Set([...arr]);
  const shuffled = [...uniqSet].sort(() => 0.5 - Math.random());
  const result = shuffled.slice(0, 20);
  return result;
};

//---------------------------------------------
export const getList = (arr) => {
  return {
    type: CONSTANTS.GET_DOGS,
    payload: arr,
  };
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId
) => {
  return {
    type: CONSTANTS.DRAG_HAPPENED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
    },
  };
};
