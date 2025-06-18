import React from 'react';

const BatchSelector = ({ batches, selectedBatch, onSelectBatch }) => {
  return (
    <div className="flex justify-center mb-10">
      <div className="bg-white rounded-xl p-10 shadow-lg max-w-xl w-full text-left">
        <label htmlFor="batch-select" className="block text-[22px] font-bold text-gray-800 mb-5">
          🎓 Select Batch:
        </label>
        <select
          id="batch-select"
          value={selectedBatch}
          onChange={(e) => onSelectBatch(e.target.value)}
          className="w-full p-4 text-lg font-medium bg-[#f4f6fc] border border-gray-300 rounded-lg text-gray-800 outline-none focus:ring-4 focus:ring-blue-300 transition-shadow"
        >
          <option value="" disabled>
            -- Choose a batch --
          </option>
          {batches.map((batch, index) => (
            <option key={index} value={batch}>
              {batch}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BatchSelector;