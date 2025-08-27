import React, { useState, useEffect } from 'react';
import { quizData } from '../data/index.js';

const CursorFollower = ({ isActive }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [currentEmoji, setCurrentEmoji] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    if (isActive) {
      document.addEventListener('mousemove', handleMouseMove);
      
      // Выбираем случайный эмодзи
      const randomIndex = Math.floor(Math.random() * quizData.cursorEmojis.length);
      setCurrentEmoji(quizData.cursorEmojis[randomIndex]);
      setShowEmoji(true);

      // Меняем эмодзи каждые 2 секунды
      const emojiInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * quizData.cursorEmojis.length);
        setCurrentEmoji(quizData.cursorEmojis[randomIndex]);
      }, 2000);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        clearInterval(emojiInterval);
        setShowEmoji(false);
      };
    } else {
      setShowEmoji(false);
    }
  }, [isActive]);

  if (!showEmoji || !isActive) return null;

  return (
    <div
      className="fixed pointer-events-none z-[10000] transition-all duration-100 ease-out"
      style={{
        left: cursorPosition.x + 15,
        top: cursorPosition.y - 15,
        fontSize: '24px',
        filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))',
      }}
    >
      <div className="animate-bounce">
        {currentEmoji}
      </div>
    </div>
  );
};

export default CursorFollower;