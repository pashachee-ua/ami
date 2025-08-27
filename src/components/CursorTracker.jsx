import React, { useState, useEffect } from 'react';

const CursorTracker = ({ children, onCursorEmoji }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleClick = (e) => {
      // Проверяем, был ли клик по кнопке ответа
      const target = e.target.closest('button');
      if (target && target.classList.contains('answer-button')) {
        onCursorEmoji(e.clientX, e.clientY);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, [onCursorEmoji]);

  return (
    <>
      {children}
    </>
  );
};

export default CursorTracker;