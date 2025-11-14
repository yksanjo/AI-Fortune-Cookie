import React from 'react';
import './ThemeSelector.css';

const THEMES = {
  default: {
    name: 'Default',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    emoji: '🌈'
  },
  sunset: {
    name: 'Sunset',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    emoji: '🌅'
  },
  ocean: {
    name: 'Ocean',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    emoji: '🌊'
  },
  forest: {
    name: 'Forest',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    emoji: '🌲'
  },
  golden: {
    name: 'Golden',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    emoji: '✨'
  },
  night: {
    name: 'Night',
    gradient: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    emoji: '🌙'
  },
  aurora: {
    name: 'Aurora',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    emoji: '🌌'
  }
};

function ThemeSelector({ currentTheme, onThemeChange }) {
  return (
    <div className="theme-selector">
      <label className="theme-label">Theme:</label>
      <div className="theme-buttons">
        {Object.entries(THEMES).map(([key, theme]) => (
          <button
            key={key}
            className={`theme-btn ${currentTheme === key ? 'active' : ''}`}
            onClick={() => onThemeChange(key)}
            title={theme.name}
            style={{ background: theme.gradient }}
          >
            <span className="theme-emoji">{theme.emoji}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;
export { THEMES };

