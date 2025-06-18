import React from 'react';
import { useState, useEffect } from 'react';
import AdminLeaveApproval from './AdminLeaveApproval';
import Leave from './AdminLeave';

const AdminProfile = () => {
  const [currentTab, setCurrentTab] = useState('requests');
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      const response = await fetch('http://localhost:8080/leave');
      if (!response.ok) throw new Error('Failed to fetch leave requests');
      const data = await response.json();
      setLeaveRequests(data);
    } catch (error) {
      console.error('Error fetching leave requests:', error.message);
    }
  };

  const handleUpdateStatus = async (leaveId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/leave/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leaveId, newStatus }),
      });
      if (!response.ok) throw new Error('Failed to update leave status');
      setLeaveRequests(prevRequests =>
        prevRequests.map(request =>
          request.leaveId === leaveId ? { ...request, status: newStatus } : request
        )
      );
    } catch (error) {
      console.error('Error updating leave status:', error.message);
    }
  };

  return (
    <div className="mt-[90px] ml-[190px]">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          {/* Sidebar Buttons */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setCurrentTab('requests')}
              className={`px-4 py-2 text-sm font-bold rounded-md bg-[#404a6d8a] text-black border border-transparent transition ${
                currentTab === 'requests' ? 'ring-2 ring-blue-300' : ''
              }`}
            >
              Leave Requests
            </button>
            <button
              onClick={() => setCurrentTab('history')}
              className={`px-4 py-2 text-sm font-bold rounded-md bg-[#404a6d8a] text-black border border-transparent transition ${
                currentTab === 'history' ? 'ring-2 ring-blue-300' : ''
              }`}
            >
              Leave History
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full">
            {currentTab === 'requests' && (
              <AdminLeaveApproval
                leaveRequests={leaveRequests}
                onUpdateStatus={handleUpdateStatus}
              />
            )}
            {currentTab === 'history' && (
              <Leave event={leaveRequests} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;