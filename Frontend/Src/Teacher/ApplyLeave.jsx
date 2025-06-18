import React, { useState, useEffect } from "react";
import Leave from "./Leave";

const ApplyLeave = () => {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [leaveHistory, setLeaveData] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userName");
    fetch(`http://localhost:8080/teacherleaves?name=${userId}`)
      .then((response) => response.json())
      .then((data) => setLeaveData(data))
      .catch((error) => console.error("Error fetching leave data:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLeaveRequest = {
      teacherId: localStorage.getItem("userName"),
      leaveId:
        Date.now().toString().slice(0, 5) +
        Math.floor(Math.random() * 1000).toString(),
      type: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
      status: "Pending",
    };

    fetch("http://localhost:8080/leave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLeaveRequest),
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error adding leave request:", error));

    setLeaveData((prevHistory) => [...prevHistory, newLeaveRequest]);

    setFormData({
      ...formData,
      startDate: "",
      endDate: "",
      reason: "",
    });
  };

  return (
    <div className="w-[90%] max-w-xl mx-auto mt-10 bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl animate-fade-in font-[Poppins]">
      <h2 className="text-center text-2xl font-semibold text-black mb-6">📅 Apply for Leave</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Leave Type */}
        <div className="flex flex-col gap-2">
          <label htmlFor="leaveType" className="font-bold text-black">Leave Type</label>
          <select
            name="leaveType"
            id="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            required
            className="p-3 rounded-lg text-black bg-white/90 shadow-inner focus:ring-2 focus:ring-pink-400"
          >
            <option value="">Select leave type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Maternity Leave">Maternity Leave</option>
            <option value="Paternity Leave">Paternity Leave</option>
            <option value="Vacation">Vacation</option>
          </select>
        </div>

        {/* Start Date */}
        <div className="flex flex-col gap-2">
          <label htmlFor="startDate" className="font-bold text-black">Start Date</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="p-3 rounded-lg text-black bg-white/90 shadow-inner focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* End Date */}
        <div className="flex flex-col gap-2">
          <label htmlFor="endDate" className="font-bold text-black">End Date</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="p-3 rounded-lg text-black bg-white/90 shadow-inner focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Reason */}
        <div className="flex flex-col gap-2">
          <label htmlFor="reason" className="font-bold text-black">Reason</label>
          <textarea
            name="reason"
            id="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            className="p-3 rounded-lg text-black bg-white/90 shadow-inner focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-2 py-3 rounded-lg bg-gradient-to-r from-pink-300 to-pink-500 text-black font-bold uppercase tracking-wider shadow-md hover:scale-105 hover:shadow-xl transition-all"
        >
          Submit
        </button>
      </form>

      {/* Leave History */}
      <h2 className="text-center text-2xl font-semibold text-black mt-10 mb-4">📜 Leave History</h2>
      <Leave event={leaveHistory} />
    </div>
  );
};

export default ApplyLeave;