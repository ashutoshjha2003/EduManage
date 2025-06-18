const Faculties = ({ facultyData }) => {
  return (
    <>
      {facultyData.map((item, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-xl p-4 mb-4 shadow hover:shadow-md transition duration-300"
        >
          <div className="text-sm sm:text-base text-blue-800 font-semibold mb-2 sm:mb-0">
            🆔 {item.teacherId}
          </div>
          <div className="text-sm sm:text-base text-gray-800 font-medium mb-2 sm:mb-0">
            👨‍🏫 {item.teacherName}
          </div>
          <div className="text-sm sm:text-base text-gray-600">
            📘 Course ID: {item.courseId}
          </div>
        </div>
      ))}
    </>
  );
};

export default Faculties;