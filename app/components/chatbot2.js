"use client"

import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import {motion} from "framer-motion"
const API_KEY = "AIzaSyDeMVFoz8gt4_N8Mmn41CpaEM2710f2ldI";
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro"});

import { Inter } from "next/font/google";

import "../../app/globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FacultyFlow | LARVA",
  description: "CS-254 Project",
};

export default function RootLayout({ children }) {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello! How may I help you?",
      sender: "FacultyBot",
      direction: "incoming"
    }
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "User",
      direction: "outgoing"
    }

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setTyping(true);

    try{
      await getQuery(message, newMessages);
    }
    catch(err){
      const errMessage = {
        message: "We are unable to assist with that query.",
        sender: "FacultyBot",
        direction: "incoming"
      }
  
      const errMessages = [...newMessages, errMessage];
      setMessages(errMessages);
    }

    setTyping(false);
  };

  async function getQuery(chatMessages, newMs){
    const message = await model.generateContent(chatMessages);
  
    const newMessage = {
      message: (message.response).text(),
      sender: "FacultyBot",
      direction: "incoming"
    }

    const newMessages = [...newMs, newMessage];
    setMessages(newMessages);
  }

  return (
      <motion.div className = 'relative h-[60vh] w-[25vw]' style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 50 }} initial={{ opacity: 0, x:100 }}
      animate={{ opacity: 1, x:0 }}
      transition={{ duration: 0.5 }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior='smooth'
              typingIndicator = {typing ? <TypingIndicator content = "Hold on..."/> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
            {!typing ? <MessageInput placeholder='Enter your query: ' onSend={handleSend} />  : null}
          </ChatContainer>
        </MainContainer>
      </motion.div>
  )
}