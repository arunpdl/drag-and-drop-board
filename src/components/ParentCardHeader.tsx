import { EditIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import CircularNumber from "../core/CircularNumber";

interface ParentCardHeaderProps {
  isDefault: boolean;
  color?: string;
  cardName: string;
  onOpen: () => void;
  cardCount: number;
  isDragging?: boolean;
}

const ParentCardHeader = ({
  isDefault,
  color,
  cardName,
  onOpen,
  cardCount,
  isDragging,
}: ParentCardHeaderProps) => {
  return (
    <Box
      rounded="sm"
      textTransform={isDefault ? "uppercase" : "none"}
      bg={isDragging ? "gray.600" : "primary"}
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
  );
};

export default ParentCardHeader;
