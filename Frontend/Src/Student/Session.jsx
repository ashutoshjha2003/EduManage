import React from "react";

const Session = ({ sessions }) => {
  return (
    <>
      {sessions.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-xl p-4 mb-4 flex flex-col gap-2 hover:shadow-lg transition"
        >
          <div className="text-lg font-semibold text-blue-700">
            {item.courseName}
          </div>
          <div className="text-sm text-gray-600">Time: {item.time}</div>
          <div className="text-sm text-gray-600">Teacher ID: {item.teacherId}</div>
          <div className="text-sm text-gray-600">Room: {item.room}</div>
        </div>
      ))}
    </>
  );
};

export default Session;