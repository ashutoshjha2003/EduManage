import React from "react";

const Quizes = ({ quizdata }) => {
  return (
    <>
      {quizdata.map((item, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-xl p-4 mb-4 flex flex-col gap-2 transition hover:shadow-lg"
        >
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 font-medium">
              {item.quiztime}
            </div>
          </div>
          <div className="text-lg font-semibold text-blue-700">{item.quiz}</div>
        </div>
      ))}
    </>
  );
};

export default Quizes;