import React, { useState, useEffect } from 'react';
import './App.css';
import FortuneCookie from './components/FortuneCookie';
import FortuneDisplay from './components/FortuneDisplay';
import ThemeSelector, { THEMES } from './components/ThemeSelector';
import StyleSelector from './components/StyleSelector';
import FortuneHistory from './components/FortuneHistory';

function App() {
  const [fortune, setFortune] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCracked, setIsCracked] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('default');
  const [fortuneHistory, setFortuneHistory] = useState([]);

  // Load theme and history from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('fortuneCookieTheme');
    const savedHistory = localStorage.getItem('fortuneCookieHistory');
    
    if (savedTheme && THEMES[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
    
    if (savedHistory) {
      try {
        setFortuneHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to load fortune history:', e);
      }
    }
  }, []);

  // Apply theme to body
  useEffect(() => {
    document.body.style.background = THEMES[currentTheme].gradient;
    localStorage.setItem('fortuneCookieTheme', currentTheme);
  }, [currentTheme]);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (fortuneHistory.length > 0) {
      // Keep only last 20 fortunes
      const limitedHistory = fortuneHistory.slice(-20);
      localStorage.setItem('fortuneCookieHistory', JSON.stringify(limitedHistory));
      setFortuneHistory(limitedHistory);
    }
  }, [fortuneHistory]);

  const getFortune = async (style = null) => {
    setIsLoading(true);
    setError(null);
    setIsCracked(false);

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/fortune`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ style: style || selectedStyle }),
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
        
        // Add to history
        if (data) {
          setFortuneHistory(prev => [...prev, data]);
        }
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

  const handleSelectFortune = (selectedFortune) => {
    setFortune(selectedFortune);
    setIsCracked(true);
    setError(null);
  };

  const handleClearHistory = () => {
    setFortuneHistory([]);
    localStorage.removeItem('fortuneCookieHistory');
  };

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">🥠 AI Fortune Cookie</h1>
          <p className="app-subtitle">Click the cookie to reveal your fortune!</p>
        </header>

        <ThemeSelector 
          currentTheme={currentTheme} 
          onThemeChange={setCurrentTheme} 
        />

        <StyleSelector
          selectedStyle={selectedStyle}
          onStyleChange={setSelectedStyle}
          disabled={isLoading}
        />

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

        <FortuneHistory
          fortunes={fortuneHistory}
          onSelectFortune={handleSelectFortune}
          onClear={handleClearHistory}
        />

        <footer className="app-footer">
          <p>Powered by AI • Get a new fortune anytime!</p>
        </footer>
      </div>
    </div>
  );
}

export default App;



