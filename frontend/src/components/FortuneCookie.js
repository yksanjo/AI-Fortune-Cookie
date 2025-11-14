import React from 'react';
import './FortuneCookie.css';

function FortuneCookie({ onClick, isLoading, isCracked }) {
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
    </div>
  );
}

export default FortuneCookie;

