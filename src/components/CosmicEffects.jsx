import React, { useEffect, useState } from 'react';
import useTheme from '../hooks/useTheme.js';

const CosmicEffects = () => {
  const { theme } = useTheme();
  const [shootingStars, setShootingStars] = useState([]);

  useEffect(() => {
    if (theme !== 'space') return;

    const createShootingStar = () => {
      const id = Math.random().toString(36).substr(2, 9);
      const star = {
        id,
        top: Math.random() * 30 + '%',
        left: '-10px',
        animationDelay: Math.random() * 2 + 's',
        animationDuration: (Math.random() * 2 + 2) + 's'
      };
      
      setShootingStars(prev => [...prev, star]);
      
      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== id));
      }, 5000);
    };

    const interval = setInterval(createShootingStar, 3000 + Math.random() * 7000);
    
    return () => clearInterval(interval);
  }, [theme]);

  if (theme !== 'space') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {shootingStars.map(star => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.animationDelay,
            animationDuration: star.animationDuration
          }}
        />
      ))}
      
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-20 nebula-drift"
           style={{
             background: 'radial-gradient(circle, var(--color-neon-purple) 0%, transparent 70%)',
             filter: 'blur(20px)'
           }} />
      
      <div className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full opacity-15 cosmic-float"
           style={{
             background: 'radial-gradient(circle, var(--color-neon-cyan) 0%, transparent 70%)',
             filter: 'blur(15px)'
           }} />
      
      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full opacity-80 stellar-pulse"
           style={{ transform: 'translate(-50%, -50%)' }} />
      
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-300 rounded-full opacity-90 stellar-pulse"
           style={{ animationDelay: '1s' }} />
      
      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-blue-300 rounded-full opacity-70 stellar-pulse"
           style={{ animationDelay: '2.5s' }} />
      
      <div className="absolute top-10 right-10 w-16 h-16 galaxy-spin opacity-30"
           style={{
             background: 'conic-gradient(from 0deg, transparent, var(--color-neon-pink), transparent, var(--color-neon-cyan), transparent)',
             borderRadius: '50%',
             filter: 'blur(8px)'
           }} />
      
      <div className="aurora-wave absolute top-0 left-0 w-full h-1 opacity-40" />
      <div className="aurora-wave absolute bottom-0 left-0 w-full h-1 opacity-30" 
           style={{ animationDelay: '6s' }} />
    </div>
  );
};

export default CosmicEffects;