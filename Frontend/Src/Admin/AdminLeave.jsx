import React from "react";

const Leave = ({ event }) => {
  const getStatusClasses = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-600";
      case "Rejected":
        return "bg-red-100 text-red-600";
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 rounded-xl bg-white backdrop-blur-md shadow-2xl transition-all">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📅 Leave History</h2>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full text-left bg-white/80 rounded-lg">
          <thead>
            <tr className="bg-black/5 text-gray-900 uppercase text-sm font-bold">
              <th className="px-5 py-3">Teacher</th>
              <th className="px-5 py-3">Start Date</th>
              <th className="px-5 py-3">End Date</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Reason</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {event.map((item, index) => (
              <tr key={index} className="hover:bg-black/5 transition duration-200">
                <td className="px-5 py-4 text-gray-800 font-medium">{item.teacherName}</td>
                <td className="px-5 py-4 text-gray-800 font-medium">{item.startDate}</td>
                <td className="px-5 py-4 text-gray-800 font-medium">{item.endDate}</td>
                <td className="px-5 py-4 text-gray-800 font-medium">{item.type}</td>
                <td className="px-5 py-4 text-gray-800 font-medium">{item.reason}</td>
                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusClasses(
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