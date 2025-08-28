import React from 'react';
import { quizData } from '../data/index.js';
import CyberClock from './CyberClock.jsx';

const HomeScreen = ({ onTermSelect }) => {
  const titles = [
    "Кем ты оказался?",
    "Пройди проверку на...",
    "Идентификация личности",
    "Кто ты на самом деле?"
  ];

  const randomTitle = titles[Math.floor(Math.random() * titles.length)];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 px-2 sm:px-4 py-8 sm:py-12 md:py-16">
      {/* Заголовок */}
      <div className="text-center mb-8 sm:mb-12 slide-in-up">
        <h1 
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-neon-cyan glow"
          data-text={randomTitle}
        >
          {randomTitle}
        </h1>
        <p className="text-gray-300 text-base sm:text-lg md:text-xl px-4">
          {(() => {
            const subtitles = [
              "Выбери термин и узнай правду о себе",
              "Диагностика личности за 30 секунд",
              "Узнай, кто ты на самом деле (спойлер: не то, что думаешь)",
              "Научно-ненаучный анализ твоей сущности",
              "Психоанализ от доктора Интернет",
              "Проверь себя на адекватность (результат может расстроить)",
              "Определи свой тип по шкале кринжа",
              "Выбери свою категорию социальной неловкости",
              "Узнай, на сколько процентов ты человек",
              "Тест на соответствие современным стандартам",
              "Диагноз ставим бесплатно, лечение не гарантируем",
              "Раскрой свою истинную сущность (предупреждали же)",
              "Определи уровень своей деградации",
              "Проверка на принадлежность к человеческому роду",
              "Выясни, что с тобой не так (а что-то точно не так)"
            ];
            return subtitles[Math.floor(Math.random() * subtitles.length)];
          })()}
        </p>
      </div>

      {/* Киберпанк часики */}
      <div className="mb-6 sm:mb-8 w-full max-w-sm slide-in-up stagger-1">
        <CyberClock />
      </div>

      {/* Сетка карточек */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl w-full px-2">
        {quizData.terms.map((term, index) => (
          <div
            key={term.id}
            onClick={() => onTermSelect(term)}
            className={`relative bg-glass rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-500 hover:scale-110 group touch-manipulation fade-in border border-neon-purple/20 hover:border-neon-cyan/60 overflow-hidden stagger-${Math.min(index % 3, 3)}`}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            {/* Светящийся фон при ховере */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-pink/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
            
            {/* Анимированные частицы */}
            <div className="absolute inset-0 pointer-events-none">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`absolute w-1 h-1 rounded-full transition-all duration-1000 opacity-0 group-hover:opacity-60 ${
                    i % 2 === 0 ? 'bg-neon-cyan' : 'bg-neon-pink'
                  }`}
                  style={{
                    top: `${20 + i * 30}%`,
                    left: `${10 + i * 25}%`,
                    animationDelay: `${i * 0.2}s`,
                    transform: `translateY(${Math.sin(index + i) * 10}px)`
                  }}
                />
              ))}
            </div>

            {/* Основной контент */}
            <div className="relative z-10 text-center">
              {/* Эмодзи с множественными эффектами */}
              <div className="relative mb-3 sm:mb-4">
                <div className="text-4xl sm:text-5xl md:text-6xl group-hover:scale-125 transition-all duration-500 group-hover:animate-pulse filter group-hover:drop-shadow-lg">
                  {term.emoji}
                </div>
                {/* Тень эмодзи */}
                <div className="absolute inset-0 text-4xl sm:text-5xl md:text-6xl opacity-0 group-hover:opacity-30 transition-all duration-500 blur-sm scale-110 text-neon-cyan">
                  {term.emoji}
                </div>
              </div>

              {/* Заголовок с глитч-эффектом */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-all duration-300 relative">
                <span className="relative z-20">{term.title}</span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 text-neon-pink blur-sm animate-pulse transition-all duration-300">
                  {term.title}
                </span>
              </h3>

              {/* Интерактивный прогресс-бар */}
              <div className="relative mb-3">
                <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-pink rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out" />
                </div>
                {/* Светящиеся точки на краях */}
                <div className="absolute -left-1 top-1/2 w-2 h-2 bg-neon-cyan rounded-full opacity-0 group-hover:opacity-100 transform -translate-y-1/2 transition-all duration-500 animate-ping" />
                <div className="absolute -right-1 top-1/2 w-2 h-2 bg-neon-pink rounded-full opacity-0 group-hover:opacity-100 transform -translate-y-1/2 transition-all duration-500 animate-ping" style={{ animationDelay: '0.5s' }} />
              </div>

              {/* Дополнительная информация */}
              <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <span className="text-neon-cyan">ID:</span> {term.id.toUpperCase()}
                <span className="mx-2">•</span>
                <span className="text-neon-pink">v{Math.floor(Math.random() * 9) + 1}.{Math.floor(Math.random() * 9)}</span>
              </div>
            </div>

            {/* Сканирующая линия */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-2000" />
            
            {/* Угловые элементы */}
            <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-neon-cyan opacity-0 group-hover:opacity-60 transition-all duration-300" />
            <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-neon-pink opacity-0 group-hover:opacity-60 transition-all duration-300" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-neon-pink opacity-0 group-hover:opacity-60 transition-all duration-300" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-neon-cyan opacity-0 group-hover:opacity-60 transition-all duration-300" />
          </div>
        ))}
      </div>

      {/* Декоративные элементы */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-neon-pink rounded-full animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-3 h-3 bg-neon-cyan rounded-full animate-pulse"></div>
    </div>
  );
};

export default HomeScreen;