import React, { useState } from 'react';

const AddcourseForm = ({ onAddcourse }) => {
  const [courseData, setCourseData] = useState({
    courseId: '',
    courseName: '',
    duration: '',
    courseImage: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddcourse(courseData);
    setCourseData({ courseId: '', courseName: '', duration: '', courseImage: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center mb-5">
      <input
        type="text"
        name="courseId"
        placeholder="Course ID"
        value={courseData.courseId}
        onChange={handleChange}
        required
        className="text-black font-bold text-sm text-center bg-[#f0f4ff] border border-gray-300 rounded-md mb-2 w-4/5 p-2 placeholder-gray-500"
      />

      <input
        type="text"
        name="courseName"
        placeholder="Course Name"
        value={courseData.courseName}
        onChange={handleChange}
        required
        className="text-black font-bold text-sm text-center bg-[#f0f4ff] border border-gray-300 rounded-md mb-2 w-4/5 p-2 placeholder-gray-500"
      />

      <input
        type="text"
        name="duration"
        placeholder="No of classes"
        value={courseData.duration}
        onChange={handleChange}
        required
        className="text-black font-bold text-sm text-center bg-[#f0f4ff] border border-gray-300 rounded-md mb-2 w-4/5 p-2 placeholder-gray-500"
      />

      <input
        type="text"
        name="courseImage"
        placeholder="Course Thumbnail URL"
        value={courseData.courseImage}
        onChange={handleChange}
        required
        className="text-black font-bold text-sm text-center bg-[#f0f4ff] border border-gray-300 rounded-md mb-2 w-4/5 p-2 placeholder-gray-500"
      />

      {error && (
        <div className="w-[370px] p-3 my-1 text-sm bg-red-600 text-white rounded text-center">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white font-bold text-sm rounded px-4 py-2 hover:bg-blue-700 transition duration-300"
      >
        Add Course
      </button>
    </form>
  );
};

export default AddcourseForm;