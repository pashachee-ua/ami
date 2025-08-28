import React, { useState, useEffect, useRef } from 'react';
import { quizData } from '../data/index.js';

const CursorFollower = ({ isActive }) => {
  const [emojiPosition, setEmojiPosition] = useState({ x: 0, y: 0 });
  const [currentEmoji, setCurrentEmoji] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  
  // Используем ref для хранения текущей позиции мыши (не вызывает ререндеры)
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const animationIdRef = useRef(null);

  // Отслеживаем движение мыши
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    if (isActive) {
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isActive]);

  // Инициализация при активации
  useEffect(() => {
    if (isActive) {
      // Выбираем случайный эмодзи
      const randomIndex = Math.floor(Math.random() * quizData.cursorEmojis.length);
      setCurrentEmoji(quizData.cursorEmojis[randomIndex]);
      
      // Получаем текущую позицию мыши
      const currentMousePos = mousePositionRef.current;
      setEmojiPosition({ x: currentMousePos.x, y: currentMousePos.y });
      
      setShowEmoji(true);
    } else {
      setShowEmoji(false);
      setEmojiPosition({ x: 0, y: 0 });
    }
  }, [isActive]);

  // Смена эмодзи по таймеру
  useEffect(() => {
    if (!isActive) return;
    
    const emojiInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quizData.cursorEmojis.length);
      setCurrentEmoji(quizData.cursorEmojis[randomIndex]);
    }, 5000);

    return () => clearInterval(emojiInterval);
  }, [isActive]);

  // Анимационный цикл (запускается только один раз)
  useEffect(() => {
    if (!isActive || !showEmoji) return;

    const animate = () => {
      setEmojiPosition(prevPos => {
        const targetX = mousePositionRef.current.x;
        const targetY = mousePositionRef.current.y;
        
        const dx = targetX - prevPos.x;
        const dy = targetY - prevPos.y;
        
        // Коэффициент интерполяции
        const lerp = 0.15;
        
        return {
          x: prevPos.x + dx * lerp,
          y: prevPos.y + dy * lerp
        };
      });
      
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isActive, showEmoji]); // Убрали mousePosition из зависимостей!

  if (!showEmoji || !isActive) return null;

  return (
    <div
      className="fixed pointer-events-none z-[10000]"
      style={{
        left: `${emojiPosition.x + 15}px`,
        top: `${emojiPosition.y - 15}px`,
        fontSize: '24px',
        filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))',
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
      }}
    >
      <div className="animate-bounce">
        {currentEmoji}
      </div>
    </div>
  );
};

export default CursorFollower;