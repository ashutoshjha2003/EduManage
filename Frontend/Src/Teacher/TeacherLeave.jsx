const Leave = ({ event }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "text-white bg-green-600 border border-green-600";
      case "Rejected":
        return "text-white bg-red-600 border border-red-600";
      case "Pending":
        return "text-white bg-yellow-600 border border-yellow-600";
      default:
        return "text-black bg-gray-300 border border-gray-300";
    }
  };

  return (
    <>
      {event.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-5 mb-4 flex flex-col gap-3"
        >
          <form className="flex flex-col">
            <label className="font-semibold text-gray-600">
              <span className="text-blue-600 text-sm">{item.leaveId}</span>
            </label>
          </form>

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <div className="text-gray-800 font-medium">{item.type}</div>
          </div>

          <div>
            <span
              className={`${getStatusStyle(
                item.status
              )} px-3 py-1 rounded-md inline-block text-sm font-medium`}
            >
              {item.status}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default Leave;