
import React from 'react';

const ModernLogo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B9D" />
          <stop offset="50%" stopColor="#C147E9" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      
      {/* Outer ring */}
      <circle 
        cx="20" 
        cy="20" 
        r="18" 
        stroke="url(#logoGradient)" 
        strokeWidth="2" 
        fill="none"
      />
      
      {/* Sound waves */}
      <path 
        d="M15 12v16M20 8v24M25 12v16M10 16v8M30 16v8" 
        stroke="url(#logoGradient)" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      
      {/* Center dot */}
      <circle 
        cx="20" 
        cy="20" 
        r="2" 
        fill="url(#logoGradient)"
      />
    </svg>
  );
};

export default ModernLogo;
