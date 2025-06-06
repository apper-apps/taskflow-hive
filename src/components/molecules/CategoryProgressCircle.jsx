import React from 'react';

const CategoryProgressCircle = ({ progress, color }) => {
  const circumference = 2 * Math.PI * 14; // 2 * pi * r, where r = 14
  const strokeDasharray = `${(progress / 100) * circumference} ${circumference}`;

  return (
    <div className="w-8 h-8 relative">
      <svg className="w-8 h-8 transform -rotate-90">
        <circle
          cx="16"
          cy="16"
          r="14"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="opacity-20"
        />
        <circle
          cx="16"
          cy="16"
          r="14"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeDasharray={strokeDasharray}
          className="transition-all duration-300"
        />
      </svg>
    </div>
  );
};

export default CategoryProgressCircle;