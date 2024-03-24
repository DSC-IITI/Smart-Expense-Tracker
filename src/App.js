import React, { useState } from "react";
import { Box, Container, Flex, Button, Icon, Center } from "@chakra-ui/react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import "./App.css";
import Main from "./components/main/main";
import CustomChatbot from "./components/main/Chatbot";
import SidBar from "./components/sidBar/SidBar";

const App = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <Container bg="#f8fafd" maxW="Container.3xl" height="100vh" p="0">
      <Flex height="full">
        <Box
          height="full"
          flex={{
            base: 0.5,
            sm: 0.5,
            md: 0.5,
            lg: 0.5,
            xl: 1,
          }}
          display={["none", "block", "block", "block", "block"]}
          mr={["30px", "20px", "30px", "60px", "50px"]}
        >
          <SidBar />
        </Box>
        <Box height="full" flex={5} w={["20%", "30%", "20%", "50%", "60%"]}>
          <Main />
        </Box>
        <Center
          position="absolute"
          top="50%"
          transform="translateY(-50%)"
          right="20px"
          zIndex="1"
        >
          <Button
            onClick={toggleChatbot}
            position="absolute"
            bottom="50%"
            right="1%"
            transform="rotate(90deg)"
            borderRadius="50%"
            p="0"
            bg="white"
            boxShadow="md"
            _hover={{ bg: "gray.100" }}
            _active={{ bg: "gray.200" }}
          >
            {isChatbotOpen ? (
              <Icon as={MdExpandLess} boxSize={6} />
            ) : (
              <Icon as={MdExpandMore} boxSize={6} />
            )}
          </Button>
          {isChatbotOpen && (
            <Box
              bg="white"
              height="full"
              flex={2}
              display={["none", "none", "block", "block", "block"]}
              animation="fadeIn 0.5s"
            >
              <CustomChatbot />
            </Box>
          )}
        </Center>
      </Flex>
    </Container>
  );
};

export default App;
