import React from 'react';
import useTheme from '../hooks/useTheme.js';

const themes = [
  { name: 'toxic', label: 'Яд', emoji: '☢️' },
  { name: 'dark', label: 'Тьма', emoji: '🌑' },
  { name: 'warm', label: 'Тепло', emoji: '🔥' },
  { name: 'space', label: 'Космос', emoji: '🌌' },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex justify-center items-center space-x-2 bg-glass border border-neon-purple/20 rounded-full p-1">
      {themes.map((themeItem) => (
        <button
          key={themeItem.name}
          onClick={() => setTheme(themeItem.name)}
          className={`px-3 py-2 text-sm rounded-full transition-all duration-500 flex items-center space-x-2 ${
            theme === themeItem.name
              ? 'bg-neon-cyan text-gray-900 shadow-lg shadow-neon-cyan/30'
              : 'text-gray-300 hover:bg-neon-purple/20'
          }`}
        >
          <span className="emoji-style text-base">{themeItem.emoji}</span>
          <span>{themeItem.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
