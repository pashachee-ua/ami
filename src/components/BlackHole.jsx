import React, { useEffect, useState, useRef } from 'react';
import useTheme from '../hooks/useTheme.js';

const BlackHole = () => {
  const { theme } = useTheme();
  const [particles, setParticles] = useState([]);
  const [isVisible, setIsVisible] = useState(theme === 'space');
  const [position, setPosition] = useState(() => ({
    x: 20 + Math.random() * 60, // 20-80% чтобы не у краёв
    y: 20 + Math.random() * 60
  }));
  const [isDragging, setIsDragging] = useState(false);
  const blackHoleRef = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (theme !== 'space') {
      setIsVisible(false);
      setParticles([]);
      return;
    }

    // Генерируем новую случайную позицию при каждом включении темы
    setPosition({
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60
    });

    const timer = setTimeout(() => setIsVisible(true), 1000);

    const createParticle = () => {
      if (theme !== 'space') return;
      
      setPosition(currentPos => {
        const id = Math.random().toString(36).substr(2, 9);
        const angle = Math.random() * Math.PI * 2;
        const distance = 200 + Math.random() * 400;
        const centerX = (window.innerWidth * currentPos.x) / 100;
        const centerY = (window.innerHeight * currentPos.y) / 100;
        
        const particle = {
          id,
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          size: Math.random() * 4 + 1,
          opacity: Math.random() * 0.9 + 0.1,
          speed: Math.random() * 1.5 + 0.5,
          color: ['#ffffff', '#00d4ff', '#c77dff', '#ff6b9d'][Math.floor(Math.random() * 4)]
        };
        
        setParticles(prev => [...prev.slice(-40), particle]);
        
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== id));
        }, 12000);
        
        return currentPos;
      });
    };

    const particleInterval = setInterval(createParticle, 300);
    
    return () => {
      clearTimeout(timer);
      clearInterval(particleInterval);
    };
  }, [theme]);

  const handleMouseDown = (e) => {
    if (!blackHoleRef.current) return;
    setIsDragging(true);
    const rect = blackHoleRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = ((e.clientX - dragOffset.current.x) / window.innerWidth) * 100;
    const newY = ((e.clientY - dragOffset.current.y) / window.innerHeight) * 100;
    setPosition({
      x: Math.max(10, Math.min(90, newX)),
      y: Math.max(10, Math.min(90, newY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  if (theme !== 'space' || !isVisible) return null;

  const centerX = (window.innerWidth * position.x) / 100;
  const centerY = (window.innerHeight * position.y) / 100;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <div 
        ref={blackHoleRef}
        className={`absolute w-48 h-48 pointer-events-auto ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{
          left: position.x + '%',
          top: position.y + '%',
          transform: 'translate(-50%, -50%)',
          animation: 'blackHoleEntrance 2s ease-out'
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="w-full h-full rounded-full relative gravitational-field">
          <div 
            className="w-full h-full rounded-full absolute gravitational-lensing"
            style={{
              background: 'radial-gradient(circle, #000000 25%, rgba(138, 43, 226, 0.4) 40%, rgba(0, 212, 255, 0.2) 60%, rgba(255, 107, 157, 0.1) 80%, transparent 100%)',
              animation: 'blackHolePulse 4s ease-in-out infinite, gravitationalWave 8s ease-in-out infinite',
              filter: 'blur(2px)'
            }}
          />
          
          <div 
            className="w-32 h-32 rounded-full absolute top-8 left-8 singularity"
            style={{
              background: 'radial-gradient(circle, #000000 30%, rgba(0, 0, 0, 0.9) 50%, transparent 80%)',
              animation: 'blackHoleCore 6s linear infinite, singularityDistortion 3s ease-in-out infinite',
              boxShadow: 'inset 0 0 50px rgba(0, 0, 0, 1), 0 0 100px rgba(138, 43, 226, 0.3)'
            }}
          />
          
          <div 
            className="absolute inset-4 rounded-full opacity-40 event-horizon"
            style={{
              background: 'conic-gradient(from 0deg, transparent, #00d4ff, transparent, #c77dff, transparent, #ff6b9d, transparent)',
              animation: 'eventHorizon 2s linear infinite, horizonFlicker 5s ease-in-out infinite',
              mask: 'radial-gradient(circle, transparent 80%, white 82%, white 88%, transparent 90%)',
              WebkitMask: 'radial-gradient(circle, transparent 80%, white 82%, white 88%, transparent 90%)'
            }}
          />
          
          <div className="absolute -inset-8 accretion-disk-outer">
            <div 
              className="w-full h-full rounded-full opacity-25"
              style={{
                background: 'conic-gradient(from 0deg, transparent, rgba(255, 107, 157, 0.6), transparent, rgba(0, 212, 255, 0.6), transparent, rgba(199, 125, 255, 0.4), transparent)',
                animation: 'accretionDisk 2s linear infinite, diskTurbulence 6s ease-in-out infinite',
                filter: 'blur(1px)'
              }}
            />
          </div>
          
          <div className="absolute -inset-16 accretion-disk-middle">
            <div 
              className="w-full h-full rounded-full opacity-15"
              style={{
                background: 'conic-gradient(from 180deg, transparent, rgba(199, 125, 255, 0.5), transparent, rgba(255, 107, 157, 0.3), transparent)',
                animation: 'accretionDisk 4s linear infinite reverse, diskWarp 8s ease-in-out infinite'
              }}
            />
          </div>
          
          <div className="absolute -inset-24 jets">
            <div 
              className="absolute top-0 left-1/2 w-2 h-32 opacity-30 transform -translate-x-1/2 -translate-y-full"
              style={{
                background: 'linear-gradient(to top, rgba(0, 212, 255, 0.8), transparent)',
                animation: 'polarJet 3s ease-in-out infinite',
                filter: 'blur(1px)'
              }}
            />
            <div 
              className="absolute bottom-0 left-1/2 w-2 h-32 opacity-30 transform -translate-x-1/2 translate-y-full"
              style={{
                background: 'linear-gradient(to bottom, rgba(0, 212, 255, 0.8), transparent)',
                animation: 'polarJet 3s ease-in-out infinite reverse',
                filter: 'blur(1px)'
              }}
            />
          </div>
        </div>
      </div>
      
      {particles.map(particle => {
        const deltaX = centerX - particle.x;
        const deltaY = centerY - particle.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const distortionFactor = Math.max(0, 300 - distance) / 300;
        
        return (
          <div
            key={particle.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: particle.x + 'px',
              top: particle.y + 'px',
              width: particle.size + 'px',
              height: particle.size + 'px',
              backgroundColor: particle.color,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              animation: `spiralIn ${10 / particle.speed}s ease-in forwards`,
              transformOrigin: `${deltaX}px ${deltaY}px`,
              filter: `blur(${distortionFactor * 2}px) brightness(${1 + distortionFactor})`,
              transform: `scale(${1 + distortionFactor * 0.5})`
            }}
          />
        );
      })}
    </div>
  );
};

export default BlackHole;