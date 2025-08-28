import React, { useEffect, useState, useRef } from 'react';
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

  const [position, setPosition] = useState({ x: x - 12, y: y - 12 });
  const [isFollowingCursor, setIsFollowingCursor] = useState(true);
  
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const animationIdRef = useRef(null);

  // Отслеживание позиции мыши
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    if (isFollowingCursor) {
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isFollowingCursor]);

  // Анимационный цикл для следования за курсором
  useEffect(() => {
    if (!isFollowingCursor) return;

    const animate = () => {
      setPosition(prevPos => {
        const targetX = mousePositionRef.current.x;
        const targetY = mousePositionRef.current.y;
        
        const dx = targetX - prevPos.x;
        const dy = targetY - prevPos.y;
        
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
  }, [isFollowingCursor]);

  useEffect(() => {
    const durations = {
      'emoji-pop': 2500,
      'emoji-float': 3000,
      'emoji-bounce': 2800,
      'emoji-spiral': 3500
    };

    // Инициализируем позицию мыши сразу
    mousePositionRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    // Завершаем через полное время анимации
    const completeTimer = setTimeout(() => {
      onComplete();
    }, durations[animationType]);

    return () => {
      clearTimeout(completeTimer);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [animationType, onComplete]);

  return (
    <div
      className={`emoji-reaction ${animationType} ${isFollowingCursor ? 'fixed pointer-events-none z-[10000]' : ''}`}
      style={{ 
        left: position.x + (isFollowingCursor ? 15 : 0),
        top: position.y - (isFollowingCursor ? 15 : 0),
        ...(isFollowingCursor && {
          fontSize: '24px',
          filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.3))',
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
        })
      }}
    >
      {isFollowingCursor ? (
        <div className="animate-bounce">{emoji}</div>
      ) : (
        emoji
      )}
    </div>
  );
};

export default EmojiReaction;
