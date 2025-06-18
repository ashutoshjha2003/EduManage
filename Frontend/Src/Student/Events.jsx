import React from "react";

const Events = ({ event }) => {
  return (
    <>
      {event.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
        >
          <div className="text-gray-700 font-semibold mb-1">
            🕒 {item.quiztime}
          </div>
          <div className="text-blue-600 font-medium mb-1">
            📝 {item.quiz}
          </div>
          <div className="text-gray-500 text-sm">
            📘 Course ID: {item.courseid}
          </div>
        </div>
      ))}
    </>
  );
};

export default Events;