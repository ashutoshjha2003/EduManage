import React from 'react';

const Timetable = ({ data = [] }) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const convertTo12HourFormat = (time) => {
    let [hour, minute] = time.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:${minute.toString().padStart(2, '0')} ${period}`;
  };

  const getCurrentTimeSlot = () => {
    const now = new Date();
    const day = days[now.getDay()];
    const hour = now.getHours();

    const currentTime = times.find(t => {
      const [slotHour] = t.split(':').map(Number);
      return hour === slotHour;
    });

    return { day, time: currentTime };
  };

  const { day: currentDay, time: currentTime } = getCurrentTimeSlot();

  const generateTimetable = () => {
    const timetable = {};
    days.forEach(day => {
      timetable[day] = {};
      times.forEach(time => {
        const slot = data.find(item => item.day === day && item.startTime === time);
        timetable[day][time] = slot || { courseName: '', room: '', teacherName: '' };
      });
    });
    return timetable;
  };

  const timetable = generateTimetable();

  return (
    <div className="max-w-[1000px] mx-auto mt-10 p-5 overflow-x-auto rounded-xl bg-white shadow-lg">
      <table className="w-full border-collapse text-center">
        <thead>
          <tr>
            <th className="border border-gray-300 p-3 bg-indigo-100 text-indigo-900 text-[16px] font-bold">
              Time
            </th>
            {days.slice(1).map(day => (
              <th
                key={day}
                className="border border-gray-300 p-3 bg-indigo-100 text-indigo-900 text-[16px] font-bold"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map(time => (
            <tr key={time}>
              <td className="border border-gray-200 p-3 font-semibold bg-gray-100 text-slate-800">
                {convertTo12HourFormat(time)}
              </td>
              {days.slice(1).map(day => {
                const slot = timetable[day][time];
                const isCurrent = day === currentDay && time === currentTime;

                return (
                  <td
                    key={day}
                    className={`border p-3 text-sm min-w-[120px] h-[80px] ${
                      isCurrent
                        ? 'bg-green-100 font-semibold shadow-inner shadow-green-500/40'
                        : slot.courseName
                        ? 'bg-blue-50'
                        : 'bg-gray-50'
                    } text-gray-800`}
                  >
                    {slot.courseName && (
                      <>
                        <div className="font-bold text-indigo-900">{slot.courseName}</div>
                        <div className="text-[13px] text-gray-600">📍 {slot.room}</div>
                        <div className="text-[13px] text-gray-600">👨‍🏫 {slot.teacherName}</div>
                      </>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;