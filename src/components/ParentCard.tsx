import {
  Box,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import ModalComponent from "../core/Modal";
import { editCard } from "../redux/global";
import { useAppDispatch } from "../redux/hooks";
import { Parent } from "../types";
import ChildCard from "./ChildCard";
import ParentCardHeader from "./ParentCardHeader";

interface ParentCardProps extends Parent {
  index: number;
}

const ParentCard = ({
  cardCount,
  cardName,
  id,
  index,
  color,
  isDefault,
  dispatches,
}: ParentCardProps) => {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [editCardInfo, setEditCardInfo] = useState<{
    cardName: string;
    color: string;
  }>({ cardName, color: color || "" });

  const handleEditCard = () => {
    if (!editCardInfo.cardName) return;
    dispatch(
      editCard({
        cardName: editCardInfo.cardName,
        color: editCardInfo.color,
        id,
      })
    );
    onClose();
    setDefaultCardInfo();
  };

  const handleClose = () => {
    onClose();
    setDefaultCardInfo();
  };

  const setDefaultCardInfo = () => {
    setEditCardInfo({ cardName, color: color || "" });
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <Box
          width={250}
          overflow="auto"
          flexShrink={0}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ParentCardHeader
            cardCount={cardCount}
            cardName={cardName}
            color={color}
            isDefault={isDefault}
            onOpen={onOpen}
            isDragging={snapshot.isDragging}
          />
          <Droppable droppableId={id}>
            {(provided) => (
              <Box
                minH={550}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {dispatches?.map(
                  (
                    {
                      dispatchName,
                      dispatchNumber,
                      dispatchTerminal,
                      dispatchTime,
                      driverName,
                    },
                    idx
                  ) => (
                    <ChildCard
                      key={`${dispatchName}-${dispatchNumber}-${idx}}`}
                      dispatchName={dispatchName}
                      dispatchNumber={dispatchNumber}
                      dispatchTerminal={dispatchTerminal}
                      dispatchTime={dispatchTime}
                      driverName={driverName}
                      index={idx}
                    />
                  )
                )}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
          <ModalComponent
            isOpen={isOpen}
            onClose={handleClose}
            title={"Edit Card"}
            actionLabel={"Save"}
            onSubmit={handleEditCard}
          >
            <FormControl mb={4}>
              <FormLabel>Card Name</FormLabel>
              <Input
                type="text"
                required
                value={editCardInfo.cardName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEditCardInfo({ ...editCardInfo, cardName: e.target.value })
                }
                autoFocus
              />
            </FormControl>
            <FormControl>
              <FormLabel>Card Color</FormLabel>
              <Input
                type="text"
                value={editCardInfo.color}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEditCardInfo({ ...editCardInfo, color: e.target.value })
                }
              />
            </FormControl>
          </ModalComponent>
        </Box>
      )}
    </Draggable>
  );
};

export default ParentCard;
