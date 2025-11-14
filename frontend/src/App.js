import React, { useState } from 'react';
import './App.css';
import FortuneCookie from './components/FortuneCookie';
import FortuneDisplay from './components/FortuneDisplay';

function App() {
  const [fortune, setFortune] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCracked, setIsCracked] = useState(false);

  const getFortune = async (style = null) => {
    setIsLoading(true);
    setError(null);
    setIsCracked(false);

    try {
      const response = await fetch('http://localhost:8000/fortune', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ style }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to get fortune');
      }

      const data = await response.json();
      
      // Wait a bit for the crack animation
      setTimeout(() => {
        setFortune(data);
        setIsCracked(true);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      setIsCracked(true);
    }
  };

  const handleCookieClick = () => {
    if (!isLoading) {
      getFortune();
    }
  };

  const handleNewFortune = () => {
    setFortune(null);
    setIsCracked(false);
    setError(null);
  };

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">🥠 AI Fortune Cookie</h1>
          <p className="app-subtitle">Click the cookie to reveal your fortune!</p>
        </header>

        <div className="cookie-container">
          <FortuneCookie
            onClick={handleCookieClick}
            isLoading={isLoading}
            isCracked={isCracked}
          />
        </div>

        {isCracked && (
          <FortuneDisplay
            fortune={fortune}
            error={error}
            onNewFortune={handleNewFortune}
          />
        )}

        <footer className="app-footer">
          <p>Powered by AI • Get a new fortune anytime!</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

