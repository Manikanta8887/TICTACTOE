import React, { useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/constants';

const Cell = ({ index, emojiData, onDrop, currentTurn, winner }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.EMOJI,
    item: { ...emojiData, index, fromPalette: false },
    canDrag: !winner && emojiData?.player === currentTurn,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [emojiData, currentTurn, winner]);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.EMOJI,
    drop: (item) => {
      if (!emojiData) {
        onDrop(item, index);
      }
    },
    canDrop: () => !emojiData,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }), [emojiData, onDrop]);

  const ref = useCallback((node) => {
    drag(node);
    drop(node);
  }, [drag, drop]);

  return (
    <div
      ref={ref}
      className={`w-20 h-20 flex justify-center items-center text-5xl select-none rounded border-2
        ${isOver && canDrop ? 'bg-green-400' : 'bg-white'}
        ${emojiData ? 'cursor-grab' : 'cursor-pointer'}`}
      style={{ userSelect: 'none', transition: 'background-color 0.3s ease' }}
      aria-label={`Cell ${index + 1} ${emojiData ? 'occupied' : 'empty'}`}
    >
      <span style={{ opacity: isDragging ? 0.4 : 1 }}>{emojiData?.emoji}</span>
    </div>
  );
};

export default Cell;
