import React, { useState } from 'react';
import './FortuneHistory.css';

function FortuneHistory({ fortunes, onSelectFortune, onClear }) {
  const [isOpen, setIsOpen] = useState(false);

  if (fortunes.length === 0) {
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
    <div className="fortune-history">
      <button
        className="history-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="View fortune history"
      >
        <span className="history-icon">📜</span>
        <span className="history-count">{fortunes.length}</span>
        <span className="history-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <div className="history-panel">
          <div className="history-header">
            <h3>Fortune History</h3>
            <button className="clear-btn" onClick={onClear} title="Clear history">
              Clear
            </button>
          </div>
          <div className="history-list">
            {fortunes.slice().reverse().map((fortune, index) => (
              <div
                key={index}
                className="history-item"
                onClick={() => {
                  onSelectFortune(fortune);
                  setIsOpen(false);
                }}
              >
                <span className="history-emoji">
                  {styleEmojis[fortune.style] || '🥠'}
                </span>
                <div className="history-content">
                  <div className="history-style">{fortune.style}</div>
                  <div className="history-text">{fortune.fortune}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FortuneHistory;

