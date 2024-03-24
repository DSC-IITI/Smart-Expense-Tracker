import React, { useState, useEffect } from "react";
import { Box, Flex, Input, Button } from "@chakra-ui/react";
import axios from "axios";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);
  const chatWithGPT3 = async (userInput) => {
    const apiEndpoint = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    };

    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant in financial matters. You can help the user in expense management and financial planning.",
        },
        {
          role: "user",
          content: userInput,
        },
      ],
    };
    try {
      const response = await axios.post(apiEndpoint, data, { headers });
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("Error communicating with the API:", error.message);
      return "";
    }
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, user: true };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    localStorage.setItem("chatMessages", JSON.stringify(newMessages));

    const aiMessage = { text: "...", user: false };
    setMessages((prevMessages) => [...prevMessages, aiMessage]);

    const response = await chatWithGPT3(input);
    const newAiMessage = { text: response, user: false };
    setMessages((prevMessages) => [...prevMessages.slice(0, -1), newAiMessage]);

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
      setInput("");
    }
  };
  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  };

  return (
    <Box m="1" p="4" border="1px solid #ccc" borderRadius="md" w="400px">
      <Box h="400px" overflowY="auto">
        {messages.map((message, index) => (
          <Flex
            key={index}
            mb="2"
            justifyContent={message.user ? "flex-end" : "flex-start"}
          >
            <Box
              p="2"
              bg={message.user ? "#68D391" : "#4A5568"}
              color="white"
              borderRadius="md"
              maxW="70%"
            >
              {message.text}
            </Box>
          </Flex>
        ))}
      </Box>
      <Flex mt="4">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
        />
        <Button ml="2" onClick={handleSubmit} bg="#4A90E2" color="white">
          Send
        </Button>
        <Button ml="2" onClick={clearChat} bg="red.400" color="white">
          Clear Chat
        </Button>
      </Flex>
    </Box>
  );
};

export default Chatbot;
