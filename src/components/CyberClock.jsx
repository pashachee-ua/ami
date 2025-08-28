import React, { useState, useEffect } from 'react';

const CyberClock = () => {
  const [time, setTime] = useState(new Date());
  const [glitch, setGlitch] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      
      // Случайный глитч каждые 3-7 секунд
      if (Math.random() < 0.02) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 150);
      }
      
      // Меняем фазу для разных эффектов
      setPhase(prev => (prev + 1) % 100);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const krinzhPhrases = [
    "А часики тикают...",
    "А время летит неумолимо...", 
    "А время утекает сквозь пальцы...",
    "А время никого не ждёт...",
    "А время мчится безжалостно...",
    "А часики тикают в унисон с сердцем...",
    "А время считает твои провалы...",
    "А время напоминает о бренности...",
    "А часики тикают, они не спят..."
  ];

  const currentPhrase = krinzhPhrases[Math.floor(time.getSeconds() / 8) % krinzhPhrases.length];

  return (
    <div className="w-full bg-glass rounded-2xl p-4 sm:p-6 border border-neon-purple/30 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-neon-cyan/25">
      <div className="text-center">
        <h3 className={`text-sm sm:text-base font-bold mb-3 transition-all duration-200 ${
          glitch ? 'glitch text-neon-pink' : 'text-neon-cyan'
        }`} data-text={currentPhrase}>
          {currentPhrase}
        </h3>
        
        <div className="relative">
          {/* Основные часы */}
          <div className={`font-mono transition-all duration-200 ${
            glitch ? 'glitch blur-sm' : ''
          }`}>
            <div className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 transition-colors duration-500 ${
              phase % 20 < 10 ? 'text-neon-cyan' : 'text-neon-pink'
            } glow`} data-text={formatTime(time)}>
              {formatTime(time)}
            </div>
            <div className="text-xs sm:text-sm text-gray-400">
              {formatDate(time)}
            </div>
          </div>

          {/* Кинетические элементы */}
          <div className="absolute -inset-2 pointer-events-none">
            {/* Вращающиеся точки */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 rounded-full transition-all duration-1000 ${
                  i % 2 === 0 ? 'bg-neon-cyan' : 'bg-neon-pink'
                }`}
                style={{
                  top: `${50 + 40 * Math.sin((time.getSeconds() + i * 15) * 0.1)}%`,
                  left: `${50 + 40 * Math.cos((time.getSeconds() + i * 15) * 0.1)}%`,
                  opacity: 0.6 + 0.4 * Math.sin((time.getSeconds() + i * 10) * 0.2),
                  transform: `scale(${1 + 0.5 * Math.sin((time.getSeconds() + i * 5) * 0.3)})`
                }}
              />
            ))}
          </div>

          {/* Тикающий индикатор */}
          <div className="flex justify-center mt-2">
            <div className={`w-2 h-2 rounded-full transition-all duration-100 ${
              time.getSeconds() % 2 === 0 ? 'bg-neon-cyan scale-125 glow' : 'bg-gray-600 scale-75'
            }`} />
          </div>
        </div>

        {/* Кринжовые статистики */}
        <div className="mt-3 pt-3 border-t border-neon-purple/20">
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
            <div>
              <span className="text-neon-pink">Секунд с 1970:</span>
              <br />
              <span className="font-mono text-white">
                {Math.floor(Date.now() / 1000).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-neon-cyan">До НГ осталось:</span>
              <br />
              <span className="font-mono text-white">
                {(() => {
                  const now = new Date();
                  const currentYear = now.getFullYear();
                  const nextNewYear = new Date(currentYear + 1, 0, 1); // 1 января следующего года
                  const daysLeft = Math.ceil((nextNewYear - now) / (1000 * 60 * 60 * 24));
                  return daysLeft;
                })()}д.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyberClock;
