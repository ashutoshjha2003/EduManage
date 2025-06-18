const Session = ({ sessions }) => {
  return (
    <>
      {sessions.map((item, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-white shadow-md rounded-xl border border-gray-200 mb-4"
        >
          <div className="text-lg font-semibold text-blue-700">{item.courseName}</div>
          <div className="text-base text-gray-700">{item.batch}</div>
          <div className="text-base text-gray-700">{item.strength}</div>
          <div className="text-base text-gray-700">{item.room}</div>
        </div>
      ))}
    </>
  );
};

export default Session;