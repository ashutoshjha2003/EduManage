const Session = ({ sessions }) => {
  return (
    <>
      {sessions.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-4 p-4 my-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="flex-1 text-sm font-semibold text-blue-700">{item.courseId}</div>
          <div className="flex-1 text-sm font-medium text-gray-800">{item.courseName}</div>
          <div className="flex-1 text-sm text-gray-600 text-right">{item.strength}</div>
        </div>
      ))}
    </>
  );
};

export default Session;