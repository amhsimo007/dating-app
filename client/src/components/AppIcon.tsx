import React from 'react';

const AppIcon: React.FC = () => {
  return (
    <svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle */}
      <circle cx="512" cy="512" r="480" fill="url(#gradient)" />
      
      {/* Gradient definition */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      
      {/* Heart shape */}
      <path d="M512 180 C448 180 384 280 384 380 C384 480 448 580 512 580 C576 580 640 480 640 380 C640 280 576 180 512 180 Z" 
            fill="white" 
            transform="translate(0, 60) scale(1.2)" />
      
      {/* Decorative elements */}
      <circle cx="380" cy="420" r="20" fill="white" opacity="0.8" />
      <circle cx="640" cy="420" r="15" fill="white" opacity="0.6" />
      <circle cx="420" cy="500" r="12" fill="white" opacity="0.7" />
      <circle cx="600" cy="500" r="18" fill="white" opacity="0.5" />
    </svg>
  );
};

export default AppIcon;
