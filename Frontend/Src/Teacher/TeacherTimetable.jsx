import React, { useState, useEffect } from 'react';
import Timetablee from './TeacherTimetableTemplate';

const TeacherTimetable = () => {
  const [timetableData, setTimetableData] = useState([]);
  const teacherId = localStorage.getItem('userName'); // Assuming this is the teacher ID

  useEffect(() => {
    fetchTimetableData();
  }, []);

  const fetchTimetableData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/teachersessions?name=${teacherId}`);
      const data = await response.json();
      setTimetableData(data);
    } catch (error) {
      console.error('Error fetching session data:', error);
    }
  };

  return (
    <div className="mt-20 px-4 md:px-10">
      <div className=" mx-auto bg-white shadow-md rounded-xl">
        <div className="overflow-x-auto">
          <Timetablee data={timetableData} />
        </div>
      </div>
    </div>
  );
};

export default TeacherTimetable;