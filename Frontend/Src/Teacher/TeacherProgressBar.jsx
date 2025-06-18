import React, { useState, useEffect } from 'react';

const Circle = ({ value, label }) => {
  const getStrokeColor = (value) => {
    if (value < 50) return '#ec0c0c';
    if (value < 75) return 'yellow';
    return '#23b9ea';
  };

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center m-4">
      <div className="relative w-20 h-20">
        <svg width="80" height="80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="transparent"
            stroke="#e5e7eb"
            strokeWidth="6"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="transparent"
            stroke={getStrokeColor(value)}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-gray-700">
          {value}%
        </div>
      </div>
      <div className="mt-2 text-sm text-center text-gray-600">{label}</div>
    </div>
  );
};

const ProgressBar = ({ data }) => {
  const [uniqueLabelsAndValues, setUniqueLabelsAndValues] = useState(new Set());

  useEffect(() => {
    const uniqueCombinations = new Set(
      data.map((item) => `${item.label}-${item.value}`)
    );
    setUniqueLabelsAndValues(uniqueCombinations);
  }, [data]);

  return (
    <div className="flex flex-wrap justify-center">
      {[...uniqueLabelsAndValues].map((combination, index) => {
        const [label, value] = combination.split('-');
        return <Circle key={index} value={parseInt(value)} label={label} />;
      })}
    </div>
  );
};

export default ProgressBar;