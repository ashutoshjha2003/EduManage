import React, { useState, useEffect } from 'react';
import AdminPanel from './AdminAddCourseTamplate'; 
import axios from 'axios';

const Adminadd = () => {
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);

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

  useEffect(() => {
    fetchCoursesAndBatches();
  }, []);

  const handleAddcourse = async (courseData) => {
    try {
      await axios.post('http://localhost:8080/courses', courseData);
      const updatedCourses = await axios.get('http://localhost:8080/courses');
      setCourses(updatedCourses.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddbatch = async (batchData) => {
    try {
      await axios.post('http://localhost:8080/batches', batchData);
      const updatedBatches = await axios.get('http://localhost:8080/batches');
      setBatches(updatedBatches.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-6 underline">👨‍👨‍👧‍👦 Admin Add Course & Batch</h2>
        <AdminPanel 
          onAddcourse={handleAddcourse} 
          onAddbatch={handleAddbatch} 
          courses={courses} 
          batches={batches}
        />
        {/* Uncomment if you want batch details tab:
        <ClickableTabs courses={courses} batches={batches} /> */}
      </div>
    </div>
  );
};

export default Adminadd;