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
    <div className="w-[95%] max-w-5xl mx-auto my-10 bg-white/30 backdrop-blur-lg p-6 rounded-xl shadow-xl font-[Poppins] animate-fade-in overflow-x-auto">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">📅 Class Timetable</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md">
          <thead>
            <tr>
              <th className="bg-blue-600 text-white text-[16px] font-bold px-4 py-3 border">Time</th>
              {days.map((day) => (
                <th
                  key={day}
                  className="bg-blue-600 text-white text-[16px] font-bold px-4 py-3 border"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {times.map((time, index) => (
              <tr key={time} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="bg-gray-200 font-bold text-gray-800 px-3 py-3 border text-sm">
                  {convertTo12HourFormat(time)}
                </td>
                {days.map((day) => (
                  <td key={day} className="px-3 py-3 border text-center text-sm">
                    <div className="text-blue-600 font-semibold text-[15px]">
                      {timetable[day][time].batch}
                    </div>
                    <div className="text-black font-semibold text-[14px]">
                      {timetable[day][time].courseName}
                    </div>
                    <div className="italic text-gray-500 text-[13px]">
                      {timetable[day][time].room}
                    </div>
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