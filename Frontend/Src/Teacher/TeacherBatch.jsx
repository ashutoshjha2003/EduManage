const Batch = ({ batchData }) => {
  return (
    <>
      {batchData.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-white rounded-lg shadow p-4 mb-3 hover:shadow-md transition duration-300"
        >
          <div className="text-blue-600 font-semibold text-sm">
            {item.courseIds.join(", ")}
          </div>
          <div className="text-gray-800 font-medium text-sm">{item.batch}</div>
          <div className="text-green-600 font-semibold text-sm">
            {item.strength}
          </div>
        </div>
      ))}
    </>
  );
};

export default Batch;
