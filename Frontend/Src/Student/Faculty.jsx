import React from "react";

const Faculty = ({ faculties }) => {
  return (
    <>
      {faculties.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
        >
          <div className="text-sm text-gray-500 font-medium mb-1">
            🆔 ID: <span className="text-blue-700 font-semibold">{item.userid}</span>
          </div>
          <div className="text-gray-700 font-semibold mb-1">
            👤 Name: {item.name}
          </div>
          <div className="text-gray-600">
            📘 Course: <span className="font-medium">{item.course}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default Faculty;
