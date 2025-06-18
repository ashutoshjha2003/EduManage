import React, { useEffect, useState } from 'react';

export default function Attendance() {
  const [attendancedata, setAttendanceData] = useState([]);
  const studentId = localStorage.getItem('userName');

  useEffect(() => {
    fetch(`http://localhost:8080/student/attendance/${studentId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Attendance data:', data);
        setAttendanceData(data);
      })
      .catch((error) => console.error('Error fetching attendance data:', error));
  }, [studentId]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-300 to-blue-100 font-[Outfit] p-4 sm:p-10 flex justify-center">
      <div className="backdrop-blur-xl bg-white/75 border border-white/40 rounded-3xl shadow-xl max-w-6xl w-full p-6 sm:p-12 animate-fadeInUp">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-8 flex items-center gap-3">
          <span>📈</span> Attendance Tracker
        </h2>

        <div className="grid grid-cols-6 font-semibold text-center text-slate-700 bg-gradient-to-r from-blue-100 to-blue-50 p-3 rounded-xl mb-4 text-sm shadow-inner">
          <div>Course ID</div>
          <div>Course</div>
          <div>Total</div>
          <div>Present</div>
          <div>Progress</div>
          <div>Status</div>
        </div>

        {attendancedata.length === 0 ? (
          <div className="text-center text-slate-500 py-6">No attendance records available.</div>
        ) : (
          attendancedata.map((item, index) => {
            const present = item.classesAttended || 0;
            const total = item.totalClasses || 0;
            const percent = total > 0 ? Math.round((present / total) * 100) : 0;
            const initials = item.courseName?.slice(0, 2).toUpperCase();

            let progressClass = 'bg-red-500';
            if (percent >= 75) progressClass = 'bg-green-500';
            else if (percent >= 50) progressClass = 'bg-orange-500';

            return (
              <div
                key={index}
                className="grid grid-cols-6 items-center text-center bg-white mb-3 rounded-xl p-3 shadow hover:scale-[1.01] transition-transform text-sm"
              >
                <div>{item.courseId}</div>
                <div>
                  <div className="bg-indigo-500 text-white w-9 h-9 rounded-full flex items-center justify-center mx-auto font-bold shadow">
                    {initials}
                  </div>
                  <div className="font-medium mt-1">{item.courseName}</div>
                </div>
                <div>{total}</div>
                <div>{present}</div>
                <div>
                  <div className="w-4/5 mx-auto h-2 bg-gray-300 rounded-full overflow-hidden">
                    <div className={`h-full ${progressClass}`} style={{ width: `${percent}%` }}></div>
                  </div>
                  <div className="text-xs mt-1">{percent}%</div>
                </div>
                <div>
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full w-fit mx-auto block ${
                      percent >= 75
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {percent >= 75 ? 'Good' : 'Low'}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}