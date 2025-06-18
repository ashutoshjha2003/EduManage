import React, { useState } from 'react';

const AddBatchForm = ({ onAddbatch, courses }) => {
  const [batchData, setBatchData] = useState({
    batchId: '',
    batchName: '',
    strength: '',
    courseIds: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'courseId') {
      setBatchData((prevData) => ({
        ...prevData,
        courseIds: [value],
      }));
    } else {
      setBatchData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAddbatch(batchData);
      setBatchData({ batchId: '', batchName: '', strength: '', courseIds: [] });
    } catch (error) {
      console.error('Error adding batch:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center mb-5"
    >
      <input
        type="text"
        name="batchId"
        placeholder="Batch ID"
        value={batchData.batchId}
        onChange={handleChange}
        required
        className="text-black font-bold text-sm text-center bg-[#f0f4ff] border border-gray-300 rounded-md mb-2 w-4/5 p-2 placeholder-gray-500"
      />

      <input
        type="text"
        name="batchName"
        placeholder="Batch Name"
        value={batchData.batchName}
        onChange={handleChange}
        required
        className="text-black font-bold text-sm text-center bg-[#f0f4ff] border border-gray-300 rounded-md mb-2 w-4/5 p-2 placeholder-gray-500"
      />

      <input
        type="text"
        name="strength"
        placeholder="Strength"
        value={batchData.strength}
        onChange={handleChange}
        required
        className="text-black font-bold text-sm text-center bg-[#f0f4ff] border border-gray-300 rounded-md mb-2 w-4/5 p-2 placeholder-gray-500"
      />

      <select
        name="courseId"
        value={batchData.courseIds[0] || ''} 
        onChange={handleChange}
        required
        className="text-black font-bold text-sm text-center bg-[#f0f4ff] border border-gray-300 rounded-md mb-2 w-4/5 p-2"
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

      <button
        type="submit"
        className="bg-blue-600 text-white font-bold text-sm rounded px-4 py-2 hover:bg-blue-700 transition duration-300"
      >
        Add Batch
      </button>
    </form>
  );
};

export default AddBatchForm;