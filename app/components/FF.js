"use client"

import Chatbot from "../components/chatbot2";
import { motion } from "framer-motion"
import "../../app/globals.css";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function FF({ isOpen }) {
    return (
        <div>
        <motion.section className =  "bg-amber-300  rounded-md absolute flex text-center items-center justify-center select-none  hover:bg-amber-400"
            style = {{  position: "fixed", bottom: 0,  right: 0, zIndex: 100 ,fontSize : isOpen? '18px':'40px',color:isOpen ? 'black':'white' ,textShadow: isOpen ? 'none':"-3px -3px 0px #FF6767, 0px -3px 0px #FF6767, -3px 0px 0px #FF6767, 0px -2.5px 0px #FF6767", bottom: isOpen ? '61vh' : '2vh', height: isOpen ? '0vh' : '10vh', width: isOpen ? '0vh' : '10vh', right: isOpen ? '7vh' : '2vh',zIndex:100}}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.1 }}
        >
            {isOpen ? "X" : "$"}
        </motion.section>     
        </div>    
    )
}