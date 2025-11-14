import React, { useState, useEffect } from 'react';
import './StyleSelector.css';

const STYLES = [
  { id: null, name: 'Random', emoji: '🎲' },
  { id: 'wisdom', name: 'Wisdom', emoji: '🧠' },
  { id: 'prediction', name: 'Prediction', emoji: '🔮' },
  { id: 'motivation', name: 'Motivation', emoji: '💪' },
  { id: 'humor', name: 'Humor', emoji: '😄' },
  { id: 'love', name: 'Love', emoji: '❤️' },
  { id: 'success', name: 'Success', emoji: '⭐' },
  { id: 'adventure', name: 'Adventure', emoji: '🌍' }
];

function StyleSelector({ selectedStyle, onStyleChange, disabled }) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedStyleData = STYLES.find(s => s.id === selectedStyle) || STYLES[0];

  useEffect(() => {
    if (disabled) {
      setIsOpen(false);
    }
  }, [disabled]);

  return (
    <div className="style-selector">
      <label className="style-label">Fortune Style:</label>
      <div className="style-dropdown">
        <button
          className={`style-button ${isOpen ? 'open' : ''} ${disabled ? 'disabled' : ''}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span className="style-emoji">{selectedStyleData.emoji}</span>
          <span className="style-name">{selectedStyleData.name}</span>
          <span className="style-arrow">▼</span>
        </button>
        {isOpen && (
          <div className="style-menu">
            {STYLES.map(style => (
              <button
                key={style.id || 'random'}
                className={`style-option ${selectedStyle === style.id ? 'selected' : ''}`}
                onClick={() => {
                  onStyleChange(style.id);
                  setIsOpen(false);
                }}
              >
                <span className="style-emoji">{style.emoji}</span>
                <span className="style-name">{style.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StyleSelector;

