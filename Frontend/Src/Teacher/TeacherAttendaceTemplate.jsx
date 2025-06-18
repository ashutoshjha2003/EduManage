import React from "react";

const StudentAttendance = ({ courseId, batchId, students, total, handlePresentChange }) => {
  return (
    <div className="w-[95%] max-w-xl mx-auto my-5 p-5 rounded-xl bg-white shadow-md transition-all">
      <h3 className="text-center text-xl font-bold text-gray-800 mb-4">📋 Student Attendance</h3>

      {/* Header */}
      <div className="grid grid-cols-4 bg-blue-600 text-white font-bold py-3 px-2 rounded-t-lg text-center">
        <div className="text-base">Student Name</div>
        <div className="text-base">Total</div>
        <div className="text-base">Present</div>
        <div className="text-base">Attendance %</div>
      </div>

      {/* Rows */}
      {students.map((student, index) => {
        const attendancePercentage = total > 0 ? parseInt((student.present / total) * 100) : 0;
        const isHigh = attendancePercentage >= 75;

        return (
          <div
            key={index}
            className={`grid grid-cols-4 py-3 px-2 text-center transition ${
              index % 2 === 0 ? "bg-gray-100" : "bg-white"
            }`}
          >
            <div className="text-gray-700 text-base">{student.studentName}</div>
            <div className="text-gray-700 text-base">{total}</div>
            <div>
              <input
                type="number"
                min="0"
                max={total}
                value={student.present}
                onChange={(e) => handlePresentChange(student.studentId, e)}
                className="w-16 p-1 text-center font-bold bg-gray-200 rounded border-2 border-transparent focus:border-blue-500 outline-none transition"
              />
            </div>
            <div
              className={`text-sm font-bold px-2 py-1 rounded ${
                isHigh
                  ? "text-green-700 bg-green-100"
                  : "text-red-700 bg-red-100"
              }`}
            >
              {attendancePercentage}%
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StudentAttendance;