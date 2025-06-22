import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';

const items = [
    { id: 1, content: "Booting core systems..." },
    { id: 2, content: "Parsing your objectives..." },
    { id: 3, content: "Mapping strategy..." },
    { id: 4, content: "Selecting the right tools for the job..." },
    { id: 5, content: "Gathering initial intelligence..." },
    { id: 6, content: "Formulating a plan of attack..." },
    { id: 7, content: "Engaging logic processors..." },
    { id: 8, content: "Connecting data streams..." },
    { id: 9, content: "Constructing the workflow..." },
    { id: 10, content: "Running tactical simulations..." },
    { id: 11, content: "Identifying the critical path..." },
    { id: 12, content: "Architecting the solution..." },
    { id: 13, content: "Calibrating execution parameters..." },
    { id: 14, content: "Preparing for launch..." },
    { id: 15, content: "Finalizing operational sequence..." },
    { id: 16, content: "Let's get to work..." }
  ];

export const AgentLoader = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((state) => {
        if (state >= items.length - 1) return 0;
        return state + 1;
      });
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex py-2 items-center w-full">
      <div>🖥️</div>
            <AnimatePresence>
            <motion.div
                key={items[index].id}
                initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -20, opacity: 0, filter: "blur(8px)" }}
                transition={{ ease: "easeInOut" }}
                style={{ position: "absolute" }}
                className='ml-7'
            >
                <AnimatedShinyText>{items[index].content}</AnimatedShinyText>
            </motion.div>
            </AnimatePresence>
        </div>
  );
};
