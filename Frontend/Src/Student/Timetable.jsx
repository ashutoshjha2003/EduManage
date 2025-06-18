import React, { useEffect, useState } from 'react';
import Timetablee from './TimetableTemplate';
import axios from 'axios';

const Timetable = () => {
  const [timetableData, setTimetableData] = useState([]);

  useEffect(() => {
    const studentId = localStorage.getItem('userName');
    const fetchTimetableData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/studenttimetable/${studentId}`);
        setTimetableData(response.data);
      } catch (error) {
        console.error('Error fetching timetable data:', error);
      }
    };

    fetchTimetableData();
  }, []);

  return (
    <div className="mt-[70px] w-full px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <div className="timetable-container">
            <Timetablee data={timetableData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
