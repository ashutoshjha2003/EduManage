const Batch = ({ batchData }) => {
  return (
    <>
      {batchData.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
        >
          <div className="text-blue-600 font-semibold text-sm">{item.batchId}</div>
          <div className="text-gray-700 font-medium text-sm">{item.batchName}</div>
          <div className="text-gray-900 font-bold text-sm">{item.strength}</div>
        </div>
      ))}
    </>
  );
};

export default Batch;