import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const CardContainer = styled.div`
  margin-bottom: 8px;
`;

const DogCard = ({ text, id, index }) => {
  // console.log("dogcard", index, id, text);
  return (
    <Draggable draggableId={String(`${text}+${id}`)} index={index}>
      {(provided) => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
            <CardContent>
              <Typography gutterBottom>
                {`Rank: ` + (index + 1)}
                &nbsp;&nbsp;&nbsp;
                {text}
              </Typography>
            </CardContent>
          </Card>
        </CardContainer>
      )}
    </Draggable>
  );
};

export default DogCard;
