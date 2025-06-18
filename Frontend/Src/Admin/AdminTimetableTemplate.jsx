import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TimetableForm from './TimetableForm';
import Timetable from './Timetable';
import BatchSelector from './BatchSelector';

const Timetablee = () => {
  const [selectedBatch, setSelectedBatch] = useState('');
  const [batchTimetables, setBatchTimetables] = useState({});
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const fetchTeachers = async () => {
    try {
      const teachersResponse = await axios.get('http://localhost:8080/teachers');
      setTeachers(teachersResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCoursesAndBatches = async () => {
    try {
      const coursesResponse = await axios.get('http://localhost:8080/courses');
      setCourses(coursesResponse.data);

      const batchesResponse = await axios.get('http://localhost:8080/batches');
      setBatches(batchesResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTimetable = async (batchId) => {
    try {
      const timetableResponse = await axios.get('http://localhost:8080/timetable', { params: { batchId } });
      setBatchTimetables((prev) => ({
        ...prev,
        [batchId]: timetableResponse.data
      }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchCoursesAndBatches();
  }, []);

  useEffect(() => {
    if (selectedBatch) {
      fetchTimetable(selectedBatch);
    }
  }, [selectedBatch]);

  const handleSave = async (newTimetable) => {
    try {
      await axios.post('http://localhost:8080/timetable', { ...newTimetable, batchId: selectedBatch });
      fetchTimetable(selectedBatch);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredCourses = courses.filter(course =>
    batches.find(batch => batch.batchId === selectedBatch)?.courseIds.includes(course.courseId)
  );

  return (
    <div className="p-6 min-w-[400px] bg-white shadow-md rounded-lg h-178 mb-2 overflow-auto">
      <h2 className="text-4xl font-bold text-[#2c3e50] underline text-center">⏰ Set Timetable </h2>

      <BatchSelector
        batches={batches.map(batch => batch.batchId)}
        selectedBatch={selectedBatch}
        onSelectBatch={setSelectedBatch}
      />

      {selectedBatch && (
        <>
          <TimetableForm onSave={handleSave} courses={filteredCourses} teachers={teachers} />
          <h2 className="text-lg font-semibold text-gray-700 mt-6 mb-2">
            Current Timetable for {selectedBatch}
          </h2>
          <Timetable data={batchTimetables[selectedBatch]} />
        </>
      )}
    </div>
  );
};

export default Timetablee;