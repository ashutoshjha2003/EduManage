import React from "react";

// Circle component to render each circular progress
const Circle = ({ value, label }) => {
  const getStrokeColor = (value) => {
    if (value < 50) return '#ec0c0c';       // red
    if (value < 75) return 'yellow';        // yellow
    return '#23b9ea';                       // blue
  };

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-evenly m-4">
      <svg width="80" height="80" className="transform -rotate-90">
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="transparent"
          stroke="#e6e6e6"
          strokeWidth="8"
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="transparent"
          stroke={getStrokeColor(value)}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="text-lg font-semibold mt-2">{value}%</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};

// Main ProgressBar component
const ProgressBar = ({ data = [] }) => {
  if (!Array.isArray(data)) {
    console.error("Invalid data passed to ProgressBar. Expected an array.");
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 p-4">
      {data.map((item, index) => (
        <Circle key={index} value={item.value} label={item.label} />
      ))}
    </div>
  );
};

export default ProgressBar;