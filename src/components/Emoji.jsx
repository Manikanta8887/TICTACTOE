import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../utils/constants';

const Emoji = ({ emoji, player }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.EMOJI,
    item: { emoji, player, fromPalette: true },
    canDrag: () => Boolean(emoji && player), 
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [emoji, player]);

  return (
    <span
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        fontSize: '2rem',
        margin: '0 8px',
        userSelect: 'none',
      }}
      role="img"
      aria-label={`emoji ${emoji}`}
    >
      {emoji}
    </span>
  );
};

export default Emoji;
