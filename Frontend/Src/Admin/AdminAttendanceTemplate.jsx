import React from "react";

const StudentAttendance = ({ batchId, students, total, handlePresentChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-7 mb-9 border border-gray-200 transition-transform duration-300">
      <div className="text-xl font-bold mb-5 text-gray-800 border-b-4 border-indigo-300 pb-2">
        Batch ID: {batchId}
      </div>

      <div className="grid grid-cols-4 items-center bg-gray-100 text-gray-800 font-semibold text-sm rounded-lg px-3 py-3 mb-3">
        <div>Student Name</div>
        <div>Total</div>
        <div>Present</div>
        <div>Attendance %</div>
      </div>

      {students.map((student, index) => {
        const attendancePercentage = total > 0 ? Math.round((student.present / total) * 100) : 0;

        return (
          <div
            key={index}
            className="grid grid-cols-4 items-center border-b border-gray-200 text-sm text-gray-800 px-3 py-3"
          >
            <div>{student.studentName}</div>
            <div>{total}</div>
            <div>
              <input
                type="number"
                min="0"
                value={student.present}
                onChange={(e) => handlePresentChange(student.studentId, e)}
                className="w-20 px-2 py-1 text-center font-medium text-gray-900 bg-blue-50 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>{attendancePercentage}%</div>
          </div>
        );
      })}
    </div>
  );
};

export default StudentAttendance;