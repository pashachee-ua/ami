import React, { useEffect, useState } from 'react';
import { quizData } from '../data/index.js';

const EmojiReaction = ({ x, y, onComplete }) => {
  const [emoji] = useState(() => {
    const randomIndex = Math.floor(Math.random() * quizData.cursorEmojis.length);
    return quizData.cursorEmojis[randomIndex];
  });

  const [animationType] = useState(() => {
    const animations = ['emoji-pop', 'emoji-float', 'emoji-bounce', 'emoji-spiral'];
    const randomIndex = Math.floor(Math.random() * animations.length);
    return animations[randomIndex];
  });

  useEffect(() => {
    // Обновленные длительности анимаций
    const durations = {
      'emoji-pop': 2500,
      'emoji-float': 3000,
      'emoji-bounce': 2800,
      'emoji-spiral': 3500
    };

    const timer = setTimeout(() => {
      onComplete();
    }, durations[animationType]);

    return () => clearTimeout(timer);
  }, [animationType, onComplete]);

  return (
    <div
      className={`emoji-reaction ${animationType}`}
      style={{ 
        left: x - 12, // Центрируем эмодзи относительно курсора
        top: y - 12 
      }}
    >
      {emoji}
    </div>
  );
};

export default EmojiReaction;