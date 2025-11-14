import React, { useState, useEffect } from 'react';
import './FortuneCookie.css';
import ParticleEffect from './ParticleEffect';

function FortuneCookie({ onClick, isLoading, isCracked }) {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (isCracked) {
      setShowParticles(true);
      const timer = setTimeout(() => setShowParticles(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCracked]);

  return (
    <div 
      className={`fortune-cookie ${isCracked ? 'cracked' : ''} ${isLoading ? 'loading' : ''}`}
      onClick={onClick}
    >
      <div className="cookie-body">
        <div className="cookie-top"></div>
        <div className="cookie-bottom"></div>
        {isCracked && (
          <>
            <div className="crack-line crack-1"></div>
            <div className="crack-line crack-2"></div>
            <div className="crack-line crack-3"></div>
          </>
        )}
      </div>
      {!isCracked && !isLoading && (
        <div className="cookie-glow"></div>
      )}
      {isLoading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      )}
      <ParticleEffect active={showParticles} />
    </div>
  );
}

export default FortuneCookie;



