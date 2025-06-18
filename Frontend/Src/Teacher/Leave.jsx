import React from "react";

const Leave = ({ event }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-600 bg-green-100";
      case "Rejected":
        return "text-red-600 bg-red-100";
      case "Pending":
        return "text-orange-500 bg-orange-100";
      default:
        return "text-black bg-gray-100";
    }
  };

  return (
    <div className="w-[90%] max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md font-sans">
      <h2 className="text-center mb-4 text-2xl text-gray-800 font-semibold">
        📝 Leave Requests
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white rounded-md">
              <th className="px-4 py-3">Leave ID</th>
              <th className="px-4 py-3">Start Date</th>
              <th className="px-4 py-3">End Date</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Reason</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {event.map((item, index) => (
              <tr
                key={index}
                className="text-center hover:bg-gray-100 transition duration-200"
              >
                <td className="px-4 py-3">{item.leaveId}</td>
                <td className="px-4 py-3">{item.startDate}</td>
                <td className="px-4 py-3">{item.endDate}</td>
                <td className="px-4 py-3">{item.type}</td>
                <td className="px-4 py-3">{item.reason}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full font-semibold ${getStatusStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leave;