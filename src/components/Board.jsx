import React from 'react';
import Cell from './Cell';
import { motion } from 'framer-motion';

const boardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.05,
    },
  },
};

const cellVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Board = ({ grid, onDrop, currentTurn, winner }) => {
  return (
    <motion.div
      className="grid grid-cols-3 gap-4 bg-orange p-4 rounded-2xl shadow-inner border-4 border-yellow-400"
      style={{
        width: 'max-content',
        margin: 'auto',
        boxShadow: '0 0 30px rgba(255, 200, 0, 0.6)',
      }}
      aria-label="Game board"
      variants={boardVariants}
      initial="hidden"
      animate="visible"
    >
      {grid.map((cell, index) => (
        <motion.div key={index} variants={cellVariants}>
          <Cell
            index={index}
            emojiData={cell}
            onDrop={onDrop}
            currentTurn={currentTurn}
            winner={winner}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Board;


