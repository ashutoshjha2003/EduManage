import React, { useState } from 'react';

const AddStudentForm = ({ onAddStudent, batches, courses }) => {
  const [studentData, setStudentData] = useState({
    studentId: '',
    studentName: '',
    studentEmail: '',
    password: '',
    courseId: '',
    batchId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'courseId') {
      setStudentData((prevData) => ({
        ...prevData,
        courseId: value,
        batchId: '', // reset batch when course changes
      }));
    } else {
      setStudentData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAddStudent(studentData);
      setStudentData({
        studentId: '',
        studentName: '',
        studentEmail: '',
        password: '',
        courseId: '',
        batchId: '',
      });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const filteredBatches = studentData.courseId
    ? batches.filter(
        (batch) =>
          Array.isArray(batch.courseIds) &&
          batch.courseIds.includes(studentData.courseId)
      )
    : [];

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center mb-5 w-full"
    >
      <input
        type="text"
        name="studentId"
        placeholder="Student ID"
        value={studentData.studentId}
        onChange={handleChange}
        required
        className="w-4/5 p-2 mb-3 rounded-md border border-gray-300 text-center font-bold text-sm bg-[#f0f4ff] placeholder-gray-500"
      />
      <input
        type="text"
        name="studentName"
        placeholder="Student Name"
        value={studentData.studentName}
        onChange={handleChange}
        required
        className="w-4/5 p-2 mb-3 rounded-md border border-gray-300 text-center font-bold text-sm bg-[#f0f4ff] placeholder-gray-500"
      />
      <input
        type="text"
        name="studentEmail"
        placeholder="Student Email"
        value={studentData.studentEmail}
        onChange={handleChange}
        required
        className="w-4/5 p-2 mb-3 rounded-md border border-gray-300 text-center font-bold text-sm bg-[#f0f4ff] placeholder-gray-500"
      />
      <input
        type="text"
        name="password"
        placeholder="Password"
        value={studentData.password}
        onChange={handleChange}
        required
        className="w-4/5 p-2 mb-3 rounded-md border border-gray-300 text-center font-bold text-sm bg-[#f0f4ff] placeholder-gray-500"
      />

      <select
        name="courseId"
        value={studentData.courseId}
        onChange={handleChange}
        required
        className="w-4/5 p-2 mb-3 rounded-md border border-gray-300 text-center font-bold text-sm bg-[#f0f4ff] text-black"
      >
        <option value="" disabled>
          Select Course
        </option>
        {courses.map((course) => (
          <option key={course._id} value={course.courseId}>
            {course.courseName}
          </option>
        ))}
      </select>

      <select
        name="batchId"
        value={studentData.batchId}
        onChange={handleChange}
        required
        disabled={!studentData.courseId}
        className={`w-4/5 p-2 mb-3 rounded-md border border-gray-300 text-center font-bold text-sm bg-[#f0f4ff] text-black ${
          !studentData.courseId ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <option value="" disabled>
          {studentData.courseId ? 'Select Batch' : 'Select Course First'}
        </option>
        {filteredBatches.length === 0 ? (
          <option disabled>No batches found for this course</option>
        ) : (
          filteredBatches.map((batch) => (
            <option key={batch._id} value={batch.batchId}>
              {batch.batchName}
            </option>
          ))
        )}
      </select>

      <button
        type="submit"
        className="mt-2 px-5 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300"
      >
        Add Student
      </button>
    </form>
  );
};

export default AddStudentForm;