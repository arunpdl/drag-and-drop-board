import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import DragAndDropPanel from "./components/DragAndDropPanel";
import ModalComponent from "./core/Modal";
import { addNewCard } from "./redux/global";
import { useAppDispatch } from "./redux/hooks";

function App() {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newCardInfo, setNewCardInfo] = useState<{
    cardName: string;
    color: string;
  }>({ cardName: "", color: "" });

  const handleAddCard = () => {
    if (!newCardInfo.cardName) return;
    dispatch(
      addNewCard({
        cardName: newCardInfo.cardName,
        color: newCardInfo.color,
      })
    );
    onClose();
    setNewCardInfo({ cardName: "", color: "" });
  };

  const handleClose = () => {
    onClose();
    setNewCardInfo({ cardName: "", color: "" });
  };

  return (
    <>
      <Box bg={"background"} height={"100vh"} width={"100vw"} p={4}>
        <Button
          colorScheme={"blue"}
          size="sm"
          onClick={onOpen}
          leftIcon={<AddIcon />}
        >
          Add Card
        </Button>
        <Box>
          <DragAndDropPanel />
        </Box>
      </Box>
      <ModalComponent
        isOpen={isOpen}
        onClose={handleClose}
        title={"Add Card"}
        actionLabel={"Save"}
        onSubmit={handleAddCard}
      >
        <FormControl mb={4}>
          <FormLabel>Card Name</FormLabel>
          <Input
            type="text"
            required
            value={newCardInfo.cardName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewCardInfo({ ...newCardInfo, cardName: e.target.value })
            }
            autoFocus
          />
        </FormControl>
        <FormControl>
          <FormLabel>Card Color</FormLabel>
          <Input
            type="text"
            value={newCardInfo.color}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewCardInfo({ ...newCardInfo, color: e.target.value })
            }
          />
        </FormControl>
      </ModalComponent>
    </>
  );
}

export default App;
