import { Box } from "@chakra-ui/react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { RootState } from "../redux/store";

import ParentCard from "../components/ParentCard";
import { dragAndDrop } from "../redux/global";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

function DragAndDropPanel() {
  const data = useAppSelector(selectGlobal);

  const dispatch = useAppDispatch();

  const handleDragEnd = (result: DropResult) => {
    dispatch(dragAndDrop({ result }));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box
        textColor={"primaryText"}
        display="flex"
        gap={4}
        my={2}
        background={"background"}
      >
        {Object.values(data).map(
          (
            { cardCount, cardName, color, id, isDefault, dispatches },
            index
          ) => (
            <ParentCard
              key={`${cardName}-${index}`}
              cardCount={cardCount}
              cardName={cardName}
              color={color}
              id={id}
              dispatches={dispatches}
              isDefault={isDefault}
            />
          )
        )}
      </Box>
    </DragDropContext>
  );
}

export const selectGlobal = (state: RootState) => state.global;

export default DragAndDropPanel;
