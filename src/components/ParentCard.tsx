import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import CircularNumber from "../core/CircularNumber";
import ModalComponent from "../core/Modal";
import { editCard } from "../redux/global";
import { useAppDispatch } from "../redux/hooks";
import { Parent } from "../types";
import ChildCard from "./ChildCard";

const ParentCard = ({
  cardCount,
  cardName,
  id,
  color,
  isDefault,
  dispatches,
}: Parent) => {
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
    <Droppable droppableId={id}>
      {(provided) => (
        <Box width={250} overflow="auto" flexShrink={0}>
          <Box
            rounded="sm"
            textTransform={isDefault ? "uppercase" : "none"}
            bg={"primary"}
            borderRadius={4}
            fontWeight="bold"
            borderTop={"2px"}
            borderColor={color}
            marginBottom={4}
            maxH={12}
            px={4}
            py={2}
            display="flex"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text>{cardName}</Text>
            <Flex alignItems={"center"} justifyContent="space-between" gap={2}>
              {!isDefault && (
                <IconButton
                  aria-label="Edit Card"
                  icon={<EditIcon />}
                  background="transparent"
                  _hover={{ background: "transparent" }}
                  onClick={onOpen}
                />
              )}
              <CircularNumber number={cardCount} />
            </Flex>
          </Box>

          <Box minH={550} {...provided.droppableProps} ref={provided.innerRef}>
            {dispatches?.map(
              (
                {
                  dispatchName,
                  dispatchNumber,
                  dispatchTerminal,
                  dispatchTime,
                  driverName,
                },
                index
              ) => (
                <ChildCard
                  key={`${dispatchName}-${dispatchNumber}-${index}}`}
                  dispatchName={dispatchName}
                  dispatchNumber={dispatchNumber}
                  dispatchTerminal={dispatchTerminal}
                  dispatchTime={dispatchTime}
                  driverName={driverName}
                  index={index}
                />
              )
            )}
          </Box>
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
    </Droppable>
  );
};

export default ParentCard;
