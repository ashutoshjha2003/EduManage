import React from 'react';

const Attendancetemp = ({ data }) => {
  return (
    <>
      {data.map((item, index) => {
        const attendancePercentage = parseInt((item.classesAttended / item.totalClasses) * 100);

        const isGood = attendancePercentage >= 75;

        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            {/* Course ID */}
            <form className="text-sm text-gray-700 font-semibold">
              <label>
                <span className="text-blue-700">{item.courseId}</span>
              </label>
            </form>

            {/* Course Name */}
            <div className="text-center sm:text-left">
              <div className="text-base font-bold text-gray-800">{item.courseName}</div>
            </div>

            {/* Total Classes */}
            <div className="text-sm text-gray-600 font-medium">
              Total: {item.totalClasses}
            </div>

            {/* Classes Attended */}
            <div className="text-sm text-gray-600 font-medium">
              Attended: {item.classesAttended}
            </div>

            {/* Attendance Percentage */}
            <div
              className={`px-4 py-2 rounded-full text-white text-sm font-bold ${
                isGood ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {attendancePercentage}%
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Attendancetemp;