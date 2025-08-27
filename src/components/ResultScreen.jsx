import React, { useState, useEffect, useMemo } from 'react';
import image from "../public/images/energy-vampire/1.webp";

const ResultScreen = ({ selectedTerm, onRestart }) => {
  const [showResult, setShowResult] = useState(false);
  const [glitchActive, setGlitchActive] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const [showPercentage, setShowPercentage] = useState(false);
  const [percentageAnimated, setPercentageAnimated] = useState(false);
  const [bgElementPositions, setBgElementPositions] = useState([]);

  const randomResult = useMemo(() => 
    selectedTerm.results[Math.floor(Math.random() * selectedTerm.results.length)], 
    [selectedTerm.results]
  );
  const finalPercentage = useMemo(() => 
    Math.floor(Math.random() * 25) + 75, 
    [selectedTerm.id]
  ); // 75-99%
  
  // Функция для получения описания на основе процента
  const getDescriptionForPercentage = (percentage) => {
    if (!selectedTerm.descriptions) return null;
    
    if (percentage >= 75 && percentage <= 84) {
      return selectedTerm.descriptions["75-84"];
    } else if (percentage >= 85 && percentage <= 94) {
      return selectedTerm.descriptions["85-94"];
    } else if (percentage >= 95) {
      return selectedTerm.descriptions["95-99"];
    }
    return null;
  };

  const currentDescription = useMemo(() => 
    getDescriptionForPercentage(finalPercentage), 
    [finalPercentage, selectedTerm.descriptions]
  );

  // Функция для генерации рандомных позиций фоновых элементов
  const generateRandomPositions = () => {
    const elements = [
      { id: 'circle1', size: 'w-4 h-4', color: 'bg-neon-cyan' },
      { id: 'circle2', size: 'w-6 h-6', color: 'bg-neon-pink' },
      { id: 'circle3', size: 'w-4 h-4', color: 'bg-neon-purple' },
      { id: 'circle4', size: 'w-6 h-6', color: 'bg-neon-cyan' },
      { id: 'rect1', size: 'w-2 h-20', color: 'bg-neon-pink' },
      { id: 'rect2', size: 'w-2 h-32', color: 'bg-neon-cyan' }
    ];

    return elements.map(element => ({
      ...element,
      top: Math.random() * 80 + 5, // 5% - 85% от высоты экрана
      left: Math.random() * 80 + 5, // 5% - 85% от ширины экрана
    }));
  };

  useEffect(() => {
    // 1. Показываем результат (1.5 секунды загрузки)
    const timer1 = setTimeout(() => {
      setShowResult(true);
    }, 1500);

    // 2. Убираем глитч эффект (через 2 секунды после появления)
    const timer2 = setTimeout(() => {
      setGlitchActive(false);
    }, 3500);

    // 3. Показываем проценты и запускаем анимацию (через 0.5 секунды после глитча)
    const timer3 = setTimeout(() => {
      setShowPercentage(true);
      
      if (!percentageAnimated) {
        setPercentageAnimated(true);
        const duration = 2000; // 2 секунды для анимации процентов
        const steps = 50;
        const increment = finalPercentage / steps;
        let current = 0;
        
        const interval = setInterval(() => {
          current += increment;
          if (current >= finalPercentage) {
            setPercentage(finalPercentage);
            clearInterval(interval);
          } else {
            setPercentage(Math.floor(current));
          }
        }, duration / steps);
      }
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [finalPercentage, percentageAnimated]);

  // useEffect для управления рандомными позициями фоновых элементов
  useEffect(() => {
    // Инициализируем позиции
    setBgElementPositions(generateRandomPositions());

    // Обновляем позиции каждую секунду
    const positionInterval = setInterval(() => {
      setBgElementPositions(generateRandomPositions());
    }, 1000);

    return () => clearInterval(positionInterval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 py-8 sm:py-12 md:py-16 relative">
      <div className="max-w-2xl w-full text-center px-2 relative z-10">
        {showResult && (
          <>
            {/* Главный результат */}
            <div className="mb-8 sm:mb-12 fade-in-slow">
              <div className="arc-float mt-8 sm:mt-12 md:mt-16 mb-6 sm:mb-8">
                <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl animate-bounce">
                  {selectedTerm.emoji}
                </div>
              </div>
              
              <h1 
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 text-neon-cyan transition-all duration-500 ${glitchActive ? 'glitch' : 'glow'}`}
                data-text={`Ты — ${selectedTerm.title}`}
              >
                Ты — {selectedTerm.title}
              </h1>
              
              {/* Подзаголовок с уровнем */}
              {currentDescription && showPercentage && (
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-neon-pink mb-4 sm:mb-6 slide-in-up opacity-80 animation-delay-200">
                  {currentDescription.subtitle}
                </h2>
              )}
              
              <div className="bg-glass rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 hover:scale-105 transition-all duration-300">
                <p className="text-lg sm:text-xl md:text-2xl text-white font-semibold leading-relaxed mb-6">
                  {randomResult}
                </p>
                
                {/* Прогресс-бар с процентами */}
                {showPercentage && (
                  <div className="slide-in-up animation-delay-400">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm sm:text-base text-gray-300">Уровень совпадения:</span>
                      <span className="text-2xl sm:text-3xl font-bold text-neon-cyan glow">
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-700 rounded-full relative overflow-hidden">
                      <div 
                        className="h-3 bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full count-up relative progress-bar"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Подробное описание */}
              {currentDescription && showPercentage && (
                <div className="bg-glass rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 hover:scale-105 transition-all duration-300 slide-in-up animation-delay-600 border border-neon-purple/30">
                  <h3 className="text-lg sm:text-xl font-bold text-neon-cyan mb-3 text-center">
                    Почему именно ты?
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed text-center">
                    {currentDescription.description}
                  </p>
                </div>
              )}

              {/* Заглушка для картинки */}
              <div className="bg-glass rounded-2xl p-6 sm:p-8 md:p-12 mb-6 sm:mb-8 border-dashed border-2 border-gray-500 hover:border-neon-purple transition-all duration-300 hover:scale-105">
                <div className="text-4xl sm:text-5xl md:text-6xl">
                  <img className="flex" src={image} width="1024" height="1024" alt=""/>
                </div>
              </div>
            </div>

            {/* Кнопка перезапуска */}
            {showPercentage && (
              <button
                onClick={onRestart}
                className="bg-neon-cyan text-black font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl text-lg sm:text-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 hover:bg-neon-pink touch-manipulation slide-in-up animation-delay-800"
              >
                Пройти заново
              </button>
            )}
          </>
        )}
      </div>

      {/* Анимированный фон с динамическими позициями */}
      <div className="absolute inset-0 pointer-events-none">
        {bgElementPositions.map((element, index) => {
          const isRect = element.id.startsWith('rect');
          const animationClass = isRect ? 'animate-pulse' : 'animate-ping';
          const shapeClass = isRect ? '' : 'rounded-full';
          
          return (
            <div
              key={element.id}
              className={`absolute ${element.size} ${element.color} ${shapeClass} ${animationClass} transition-all duration-1000 ease-in-out`}
              style={{
                top: `${element.top}%`,
                left: `${element.left}%`,
              }}
            />
          );
        })}
      </div>

      {/* Эффект загрузки */}
      {!showResult && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center slide-in-up px-4">
            <div className="text-5xl sm:text-6xl mb-6 sm:mb-8 animate-spin pulse-slow">🔮</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 animate-pulse">
              Собираем данные о твоей личности...
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mb-6 animate-pulse">
              Анализируем ответы и определяем твой тип
            </p>
            <div className="w-48 sm:w-64 h-2 bg-gray-700 rounded-full mx-auto mb-6 relative overflow-hidden">
              <div className="h-2 bg-neon-pink rounded-full w-4/5 progress-bar relative"></div>
            </div>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-neon-cyan rounded-full loading-dots"></div>
              <div className="w-3 h-3 bg-neon-pink rounded-full loading-dots"></div>
              <div className="w-3 h-3 bg-neon-purple rounded-full loading-dots"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultScreen;
