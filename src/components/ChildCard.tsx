import { CalendarIcon, InfoIcon, SunIcon, TimeIcon } from "@chakra-ui/icons";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { Draggable } from "@hello-pangea/dnd";
import { Dispatch } from "../types";

interface DispatchWithIndex extends Dispatch {
  index: number;
}

const ChildCard = ({
  dispatchNumber,
  dispatchName,
  dispatchTerminal,
  driverName,
  dispatchTime,
  index,
}: DispatchWithIndex) => {
  return (
    <Draggable draggableId={dispatchName} index={index}>
      {(provided, snapshot) => (
        <Stack
          rounded="sm"
          bg={snapshot.isDragging ? "blue.800" : "primary"}
          px={4}
          py={2}
          my={2}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Text mb={2}># {dispatchNumber}</Text>
          <Flex alignItems="center" gap={2}>
            <CalendarIcon />
            <Text>{dispatchName}</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <InfoIcon />
            <Text>{dispatchTerminal}</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <SunIcon />
            <Text>{driverName}</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <TimeIcon />
            <Text>
              {dispatchTime.startDate} - {dispatchTime.endDate}
            </Text>
          </Flex>
        </Stack>
      )}
    </Draggable>
  );
};

export default ChildCard;
