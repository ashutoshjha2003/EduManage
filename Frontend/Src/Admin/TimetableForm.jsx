import React, { useState, useEffect } from 'react';

const TimetableForm = ({ onSave, courses, teachers }) => {
  const [courseId, setCourseId] = useState('');
  const [day, setDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [room, setRoom] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  useEffect(() => {
    if (courseId) {
      const filtered = teachers.filter(teacher => teacher.courseId === courseId);
      setFilteredTeachers(filtered);
    } else {
      setFilteredTeachers([]);
    }
  }, [courseId, teachers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCourse = courses.find(course => course.courseId === courseId);
    const selectedTeacher = teachers.find(teacher => teacher.teacherId === teacherId);
    onSave({
      courseName: selectedCourse?.courseName || '',
      day,
      startTime,
      room,
      teacherName: selectedTeacher?.teacherName || '',
      teacherId: selectedTeacher?.teacherId || ''
    });

    // Clear form
    setCourseId('');
    setDay('');
    setStartTime('');
    setRoom('');
    setTeacherId('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto my-10 p-8 bg-white rounded-xl shadow-lg flex flex-col gap-5 sm:p-6"
    >
      <div className="flex flex-col">
        <label className="font-semibold mb-1 text-gray-800 text-sm">Course</label>
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          required
          className="p-3 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white text-sm font-medium"
        >
          <option value="">Select a course</option>
          {courses.map(course => (
            <option key={course.courseId} value={course.courseId}>
              {course.courseName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1 text-gray-800 text-sm">Day</label>
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          required
          className="p-3 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white text-sm font-medium"
        >
          <option value="">Select Day</option>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1 text-gray-800 text-sm">Start Time</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          className="p-3 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white text-sm font-medium"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1 text-gray-800 text-sm">Room</label>
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Room"
          required
          className="p-3 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white text-sm font-medium"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold mb-1 text-gray-800 text-sm">Teacher</label>
        <select
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          required
          className="p-3 rounded-md border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white text-sm font-medium"
        >
          <option value="">Select a teacher</option>
          {filteredTeachers.map(teacher => (
            <option key={teacher.teacherId} value={teacher.teacherId}>
              {teacher.teacherName}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 active:scale-95 transition"
      >
        Save
      </button>
    </form>
  );
};

export default TimetableForm;