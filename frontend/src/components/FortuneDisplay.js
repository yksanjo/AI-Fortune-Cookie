import React, { useState, useEffect } from 'react';
import './FortuneDisplay.css';

function FortuneDisplay({ fortune, error, onNewFortune }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  if (error) {
    return (
      <div className={`fortune-display ${isVisible ? 'visible' : ''}`}>
        <div className="fortune-paper error">
          <p className="error-message">⚠️ {error}</p>
          <p className="error-hint">Make sure the backend is running and an AI provider is configured.</p>
          <button className="new-fortune-btn" onClick={onNewFortune}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!fortune) {
    return null;
  }

  const styleEmojis = {
    wisdom: '🧠',
    prediction: '🔮',
    motivation: '💪',
    humor: '😄',
    love: '❤️',
    success: '⭐',
    adventure: '🌍'
  };

  return (
    <div className={`fortune-display ${isVisible ? 'visible' : ''}`}>
      <div className="fortune-paper">
        <div className="fortune-header">
          <span className="fortune-emoji">{styleEmojis[fortune.style] || '🥠'}</span>
          <span className="fortune-style">{fortune.style}</span>
        </div>
        <p className="fortune-text">{fortune.fortune}</p>
        <div className="fortune-footer">
          <button className="new-fortune-btn" onClick={onNewFortune}>
            Get Another Fortune 🥠
          </button>
        </div>
      </div>
    </div>
  );
}

export default FortuneDisplay;

