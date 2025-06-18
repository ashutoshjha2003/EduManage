import React from "react";

const Timetable = ({ data }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const convertTo12HourFormat = (time) => {
    let [hour, minute] = time.split(":");
    hour = parseInt(hour);
    const period = hour >= 12 ? "PM" : "AM";
    if (hour > 12) hour -= 12;
    if (hour === 0) hour = 12;
    return `${hour}:${minute} ${period}`;
  };

  const generateTimetable = () => {
    const timetable = {};
    days.forEach((day) => {
      timetable[day] = {};
      times.forEach((time) => {
        const slot = data.find((item) => item.day === day && item.time === time);
        timetable[day][time] = slot || { courseId: '', courseName: '', room: '', batch: '' };
      });
    });
    return timetable;
  };

  const timetable = generateTimetable();

  return (
    <div className="w-350 mx-auto mt-5 bg-white p-5 rounded-xl shadow-xl font-[Poppins] animate-fadeIn overflow-x-auto mb-20">
      <h2 className="text-center text-4xl font-bold text-gray-800 mb-6 underline">⏰ Class Timetable</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md">
          <thead>
            <tr>
              <th className="bg-blue-700 text-white text-base font-bold p-3 border border-gray-300">Time</th>
              {days.map((day) => (
                <th
                  key={day}
                  className="bg-blue-700 text-white text-base font-bold p-3 border border-gray-300"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time, i) => (
              <tr key={time} className={i % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="bg-gray-200 font-semibold text-gray-800 p-3 border border-gray-300 text-sm">
                  {convertTo12HourFormat(time)}
                </td>
                {days.map((day) => (
                  <td key={day} className="p-3 border border-gray-300 text-sm text-center">
                    <div className="font-semibold text-blue-600 text-[15px]">{timetable[day][time].batch}</div>
                    <div className="font-semibold text-black text-[14px]">{timetable[day][time].courseName}</div>
                    <div className="italic text-gray-500 text-[13px]">{timetable[day][time].room}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;