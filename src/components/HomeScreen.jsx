import React from 'react';
import { quizData } from '../data/index.js';

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

      {/* Сетка карточек */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl w-full px-2">
        {quizData.terms.map((term, index) => (
          <div
            key={term.id}
            onClick={() => onTermSelect(term)}
            className={`bg-glass rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover-glow hover:scale-105 group touch-manipulation fade-in stagger-${Math.min(index % 3, 3)}`}
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:animate-bounce transition-all duration-300">
                {term.emoji}
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-glow transition-all duration-300">
                {term.title}
              </h3>
              <div className="w-full h-1 bg-neon-purple rounded opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:bg-neon-cyan"></div>
            </div>
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