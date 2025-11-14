import React, { useState, useEffect } from 'react';
import './FortuneDisplay.css';

function FortuneDisplay({ fortune, error, onNewFortune }) {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Fade in animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleCopy = async () => {
    if (!fortune) return;
    
    const textToCopy = `${fortune.fortune}\n\n— ${fortune.style} fortune 🥠`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (!fortune) return;
    
    const shareText = `${fortune.fortune}\n\n— ${fortune.style} fortune 🥠`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Fortune Cookie',
          text: shareText,
        });
      } catch (err) {
        // User cancelled or error occurred
        console.log('Share cancelled');
      }
    } else {
      // Fallback to copy
      handleCopy();
    }
  };

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
        <div className="fortune-actions">
          <button 
            className="action-btn copy-btn" 
            onClick={handleCopy}
            title="Copy fortune"
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
          {navigator.share && (
            <button 
              className="action-btn share-btn" 
              onClick={handleShare}
              title="Share fortune"
            >
              📤 Share
            </button>
          )}
        </div>
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



