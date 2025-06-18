import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const AdminLeaveApproval = ({ leaveRequests, onUpdateStatus }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />;
      case 'Rejected':
        return <FontAwesomeIcon icon={faTimesCircle} className="text-red-600" />;
      case 'Pending':
        return <FontAwesomeIcon icon={faExclamationCircle} className="text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-600';
      case 'Rejected':
        return 'bg-red-100 text-red-600';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-500';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-xl transition-all duration-300 font-sans">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">📝 Leave Requests</h2>

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
              <th className="px-4 py-3 text-left">Teacher</th>
              <th className="px-4 py-3 text-left">Start Date</th>
              <th className="px-4 py-3 text-left">End Date</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Reason</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((item, index) => (
              item.status === 'Pending' && (
                <tr key={index} className="hover:bg-gray-50 transition-colors text-sm">
                  <td className="px-4 py-3 text-gray-800">{item.teacherName}</td>
                  <td className="px-4 py-3 text-gray-800">{item.startDate}</td>
                  <td className="px-4 py-3 text-gray-800">{item.endDate}</td>
                  <td className="px-4 py-3 text-gray-800">{item.type}</td>
                  <td className="px-4 py-3 text-gray-800">{item.reason}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold text-xs ${getStatusClasses(item.status)}`}>
                      {getStatusIcon(item.status)} {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-4 py-2 rounded-md mr-2 transition"
                      onClick={() => onUpdateStatus(item.leaveId, 'Approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-4 py-2 rounded-md transition"
                      onClick={() => onUpdateStatus(item.leaveId, 'Rejected')}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLeaveApproval;
