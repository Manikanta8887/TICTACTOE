import React from 'react';
import Emoji from './Emoji';
import { EMOJI_CATEGORIES } from '../utils/constants';

const EmojiPicker = ({ category, player }) => {
  const emojis = EMOJI_CATEGORIES?.[category] ?? [];

  return (
    <div className="flex flex-wrap p-2 border rounded max-w-sm">
      {emojis.map((emoji, idx) => (
        <Emoji key={idx} emoji={emoji} player={player} />
      ))}
    </div>
  );
};

export default EmojiPicker;

