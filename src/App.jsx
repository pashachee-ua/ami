import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import DisclaimerScreen from './components/DisclaimerScreen';
import CosmicEffects from './components/CosmicEffects';
import BlackHole from './components/BlackHole';
import useTheme from './hooks/useTheme';
import './styles/index.css';

const SCREENS = {
  DISCLAIMER: 'disclaimer',
  HOME: 'home',
  QUIZ: 'quiz',
  RESULT: 'result'
};

function App() {
  useTheme(); // Initialize theme
  const [currentScreen, setCurrentScreen] = useState(SCREENS.DISCLAIMER);
  const [selectedTerm, setSelectedTerm] = useState(null);

  const handleDisclaimerAccept = () => {
    setCurrentScreen(SCREENS.HOME);
  };

  const handleTermSelect = (term) => {
    setSelectedTerm(term);
    setCurrentScreen(SCREENS.QUIZ);
  };

  const handleQuizComplete = () => {
    setCurrentScreen(SCREENS.RESULT);
  };

  const handleRestart = () => {
    setSelectedTerm(null);
    setCurrentScreen(SCREENS.HOME);
  };

  const handleBack = () => {
    setCurrentScreen(SCREENS.HOME);
    setSelectedTerm(null);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case SCREENS.DISCLAIMER:
        return <DisclaimerScreen onAccept={handleDisclaimerAccept} />;
        
      case SCREENS.HOME:
        return <HomeScreen onTermSelect={handleTermSelect} />;
      
      case SCREENS.QUIZ:
        return (
          <QuizScreen 
            selectedTerm={selectedTerm}
            onQuizComplete={handleQuizComplete}
            onBack={handleBack}
          />
        );
      
      case SCREENS.RESULT:
        return (
          <ResultScreen 
            selectedTerm={selectedTerm}
            onRestart={handleRestart}
          />
        );
      
      default:
        return <DisclaimerScreen onAccept={handleDisclaimerAccept} />;
    }
  };

  return (
    <div className="App">
      <CosmicEffects />
      <BlackHole />
      {renderCurrentScreen()}
    </div>
  );
}

export default App;