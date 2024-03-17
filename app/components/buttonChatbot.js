"use client"

import Chatbot from "../components/chatbot2";
import FF from "../components/FF";
import "../../app/globals.css";
import { useState } from "react";
import {motion} from "framer-motion";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });



  

export default function RootLayout({ children }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.div  
      >
            {open ? <Chatbot floating={true}/> : null}
            <button onClick = {() => setOpen(!open)}><FF isOpen={open} /></button>
        </motion.div>
    )
}