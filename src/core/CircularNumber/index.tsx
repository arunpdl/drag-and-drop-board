import { Box } from "@chakra-ui/react";

const CircularNumber = ({ number }: { number: number }) => {
  return (
    <Box
      width={30}
      height={30}
      borderRadius={"50%"}
      textAlign={"center"}
      borderWidth={3}
      borderColor="#0f131a"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      fontSize={"sm"}
      fontWeight={"bold"}
    >
      {number}
    </Box>
  );
};

export default CircularNumber;
