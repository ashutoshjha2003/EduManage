const Circle = ({ value, label }) => {
  const getStrokeColor = (value) => {
    if (value < 50) return '#ec0c0c';      // Red
    if (value < 75) return 'yellow';       // Yellow
    return '#23b9ea';                      // Blue
  };

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center m-4">
      <div className="relative w-20 h-20">
        <svg width="80" height="80" className="transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="transparent"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          {/* Progress Circle */}
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
        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-800">
          {value}%
        </div>
      </div>
      <div className="mt-2 text-sm font-medium text-center text-gray-700">{label}</div>
    </div>
  );
};

const ProgressBar = ({ data }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {data.map((item, index) => (
        <Circle key={index} value={item.value} label={item.label} />
      ))}
    </div>
  );
};

export default ProgressBar;