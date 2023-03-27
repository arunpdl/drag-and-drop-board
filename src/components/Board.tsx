import { Box } from "@chakra-ui/react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { RootState } from "../redux/store";

import { DRAG_TYPES } from "../constants";
import { dragAndDrop } from "../redux/global";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ParentCard from "./ParentCard";

function Board() {
  const { dndData, orderedKeys } = useAppSelector(selectGlobal);

  const dispatch = useAppDispatch();

  const handleDragEnd = (result: DropResult) => {
    dispatch(dragAndDrop({ result }));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId="board"
        direction="horizontal"
        type={DRAG_TYPES.PARENT_CARD}
      >
        {(provided) => (
          <Box
            textColor={"primaryText"}
            display="flex"
            gap={4}
            my={2}
            background={"background"}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {orderedKeys.map((key, index) => (
              <ParentCard
                key={key}
                cardCount={dndData[key].cardCount}
                cardName={dndData[key].cardName}
                color={dndData[key].color}
                id={key}
                index={index}
                dispatches={dndData[key].dispatches}
                isDefault={dndData[key].isDefault}
              />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export const selectGlobal = (state: RootState) => state.global;

export default Board;
