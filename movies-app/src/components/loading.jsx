import React from 'react';
import '../styles/Loading.css';

const Loading = ({ message = "Loading...", showProgress = false, progress = 0 }) => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        {/* Animated spinner */}
        <div className="spinner-wrapper">
          <div className="spinner">
            <div className="spinner-inner"></div>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="loading-text">
          <h2>{message}</h2>
          <div className="dots">
            <span className="dot dot-1">.</span>
            <span className="dot dot-2">.</span>
            <span className="dot dot-3">.</span>
          </div>
        </div>
        
        {/* Optional progress bar */}
        {showProgress && (
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              ></div>
            </div>
            <span className="progress-text">{Math.round(progress)}%</span>
          </div>
        )}
      </div>
      
      {/* Background overlay */}
      <div className="loading-overlay"></div>
    </div>
  );
};

export default Loading;