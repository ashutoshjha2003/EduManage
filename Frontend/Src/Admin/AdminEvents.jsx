const Events = ({ event }) => {
  return (
    <>
      {event.map((item, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-xl p-4 mb-4 shadow hover:shadow-md transition duration-300"
        >
          <div className="text-sm sm:text-base text-gray-800 font-medium mb-2 sm:mb-0">
            🕒 {item.quiztime}
          </div>
          <div className="text-sm sm:text-base text-blue-700 font-semibold mb-2 sm:mb-0">
            📘 {item.quiz}
          </div>
          <div className="text-sm sm:text-base text-gray-600">
            🧑‍🏫 {item.courseid}
          </div>
        </div>
      ))}
    </>
  );
};

export default Events;