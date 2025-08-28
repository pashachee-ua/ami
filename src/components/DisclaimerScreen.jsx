import React, { useState } from 'react';

const DisclaimerScreen = ({ onAccept }) => {
  const [pulseAnimation, setPulseAnimation] = useState(false);

  const handleAccept = () => {
    setPulseAnimation(true);
    setTimeout(() => {
      onAccept();
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className={`transform transition-all duration-300 ${pulseAnimation ? 'scale-110' : ''}`}>
          <h1 
            className="text-6xl md:text-8xl font-black mb-8 glitch text-red-500"
            data-text="ДИСКЛЕЙМЕР"
            style={{
              textShadow: `
                0 0 15px #ff0000,
                3px 3px 0px #cc0000
              `
            }}
          >
            ДИСКЛЕЙМЕР
          </h1>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              🚨 Ты входишь в ментально опасную зону! 🚨
            </h2>
            
            <p className="text-lg md:text-xl text-white mb-6 leading-relaxed">
              Здесь ломаются представления о себе, рушатся мифы и рождаются новые комплексы.
            </p>
            
            <p className="text-lg md:text-xl text-white mb-8 leading-relaxed">
              Открывая этот сайт, ты добровольно соглашаешься на абсурд, стёб и откровения, которые нельзя развидеть.
            </p>
            
            <p className="text-xl md:text-2xl font-bold text-white mb-8">
              👉 Готов?
            </p>
            
            <button
              onClick={handleAccept}
              className="px-8 py-4 bg-white hover:bg-gray-200 text-black font-bold text-xl rounded-full transition-all duration-300 transform hover:scale-105"
            >
              ПОНЯТНО, ПРОДОЛЖИТЬ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerScreen;
