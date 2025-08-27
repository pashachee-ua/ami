import React, { useState, useEffect } from 'react';
import { quizData } from '../data/index.js';
import EmojiReaction from './EmojiReaction';
import CursorFollower from './CursorFollower';

const QuizScreen = ({ selectedTerm, onQuizComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showReaction, setShowReaction] = useState(false);
  const [reactionText, setReactionText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emojiReactions, setEmojiReactions] = useState([]);
  const [cursorFollowerActive, setCursorFollowerActive] = useState(true);

  const currentQuestion = selectedTerm.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === selectedTerm.questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / selectedTerm.questions.length) * 100;

  const handleAnswerSelect = (answerIndex, event) => {
    if (selectedAnswer !== null || showReaction) return;

    // Создаем эмодзи-реакцию в месте клика
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;
    
    const newEmoji = {
      id: Date.now(),
      x: x,
      y: y
    };
    
    setEmojiReactions(prev => [...prev, newEmoji]);

    // Отключаем курсор-эмодзи после клика
    setCursorFollowerActive(false);

    setSelectedAnswer(answerIndex);
    
    // Показываем реакцию для конкретного ответа
    const answerReactions = currentQuestion.answerReactions?.[answerIndex] || quizData.generalReactions;
    const randomReaction = answerReactions[Math.floor(Math.random() * answerReactions.length)];
    setReactionText(randomReaction);
    setShowReaction(true);

    // Переходим к следующему вопросу или завершаем квиз
    setTimeout(() => {
      if (isLastQuestion) {
        setIsLoading(true);
        setTimeout(() => {
          onQuizComplete();
        }, 4000);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowReaction(false);
        setReactionText('');
        setCursorFollowerActive(true); // Включаем обратно для следующего вопроса
      }
    }, 3500);
  };

  const handleEmojiComplete = (emojiId) => {
    setEmojiReactions(prev => prev.filter(emoji => emoji.id !== emojiId));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 py-8 sm:py-12 md:py-16">
        <div className="text-center slide-in-up">
          <div className="text-5xl sm:text-6xl mb-6 sm:mb-8 animate-spin emoji-style">⚡️</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 animate-pulse px-4">
            Анализируем результаты...
          </h2>
          <div className="w-48 sm:w-64 h-2 bg-gray-700 rounded-full mx-auto relative overflow-hidden mb-6">
            <div className="h-2 bg-neon-cyan rounded-full animate-pulse w-full progress-bar relative"></div>
          </div>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-neon-cyan rounded-full loading-dots"></div>
            <div className="w-2 h-2 bg-neon-pink rounded-full loading-dots"></div>
            <div className="w-2 h-2 bg-neon-purple rounded-full loading-dots"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-2 sm:p-4 py-6 sm:py-8 md:py-12">
      {/* Хедер с прогрессом */}
      <div className="mb-6 sm:mb-8 slide-in-up">
        <div className="flex items-center justify-between mb-4 px-2">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 hover:scale-105 touch-manipulation"
          >
            ← <span className="hidden sm:inline">Назад</span>
          </button>
          <div className="text-neon-cyan font-bold text-sm sm:text-base text-center">
            {selectedTerm.emoji} {selectedTerm.title}
          </div>
          <div className="text-gray-400 text-sm sm:text-base">
            {currentQuestionIndex + 1} / {selectedTerm.questions.length}
          </div>
        </div>
        
        <div className="w-full h-2 bg-gray-700 rounded-full relative overflow-hidden">
          <div 
            className="h-2 bg-neon-cyan rounded-full transition-all duration-500 glow progress-bar relative"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Главный контент */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-4xl w-full px-2">
          {!showReaction ? (
            // Экран вопроса
            <div className="text-center slide-in-right">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 sm:mb-12 leading-relaxed px-4">
                {currentQuestion.text}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={(event) => handleAnswerSelect(index, event)}
                    className={`answer-button bg-glass rounded-2xl p-4 sm:p-6 text-base sm:text-lg font-semibold text-white transition-all duration-300 hover-glow hover:scale-105 hover:bg-opacity-20 group touch-manipulation fade-in stagger-${index + 1}`}
                    disabled={selectedAnswer !== null}
                  >
                    <div className="group-hover:text-glow transition-all duration-300">
                      {option}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Экран реакции
            <div className="text-center slide-in-left">
              <div className="text-5xl sm:text-6xl mb-6 sm:mb-8 animate-bounce">
                {selectedTerm.emoji}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neon-pink mb-6 sm:mb-8 text-glow animate-pulse px-4">
                {reactionText}
              </h2>
              <div className="flex justify-center mb-4">
                <div className="animate-spin text-3xl sm:text-4xl emoji-style">⚡️</div>
              </div>
              {!isLastQuestion && (
                <p className="text-gray-400 mt-4 text-sm sm:text-base">Следующий вопрос...</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Декоративные элементы */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-neon-pink rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 left-20 w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-3 h-3 bg-neon-cyan rounded-full animate-pulse"></div>

      {/* Эмодзи реакции */}
      {emojiReactions.map((emoji) => (
        <EmojiReaction
          key={emoji.id}
          x={emoji.x}
          y={emoji.y}
          onComplete={() => handleEmojiComplete(emoji.id)}
        />
      ))}

      {/* Курсор-эмодзи убран для экрана вопросов */}
    </div>
  );
};

export default QuizScreen;