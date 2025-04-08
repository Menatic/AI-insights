
import React from 'react';

export interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 36,
  strokeWidth = 3,
  label
}) => {
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (100 - value) / 100 * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3A86FF" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
      
      {label && (
        <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
          {label}
        </div>
      )}
    </div>
  );
};

export default CircularProgress;
