import React, { useState, useEffect } from 'react';
import AdminPanel from './AdminAddComponent';
import axios from 'axios';

const AdminCourse = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);

  const fetchStudentsAndTeachers = async () => {
    try {
      const studentsResponse = await axios.get('http://localhost:8080/students');
      const teachersResponse = await axios.get('http://localhost:8080/teachers');
      setStudents(studentsResponse.data);
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

  useEffect(() => {
    fetchStudentsAndTeachers();
    fetchCoursesAndBatches();
  }, []);

  const handleAddStudent = async (studentData) => {
    try {
      const selectedBatch = batches.find(batch => batch.batchId === studentData.batch);
      if (selectedBatch) {
        studentData.courseIds = selectedBatch.courseIds;
      }

      const response = await axios.post('http://localhost:8080/student/add', studentData);
      setStudents([...students, response.data]);

      const studentsResponse = await axios.get('http://localhost:8080/students');
      setStudents(studentsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTeacher = async (teacherData) => {
    try {
      const response = await axios.post('http://localhost:8080/teacher/add', teacherData);
      console.log('Added teacher response:', response.data);

      setTeachers([...teachers, response.data]);

      const teachersResponse = await axios.get('http://localhost:8080/teachers');
      setTeachers(teachersResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 h-198 overflow-auto">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-25">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6 mt-3 underline">
          🧑‍🎓 Admin Add Teacher & Student
        </h2>

        <AdminPanel 
          onAddStudent={handleAddStudent} 
          onAddTeacher={handleAddTeacher} 
          batches={batches} 
          courses={courses} 
        />

        {/* Uncomment when ClickableTabs is ready */}
        {/* <ClickableTabs students={students} teachers={teachers} /> */}
      </div>
    </div>
  );
};

export default AdminCourse;
