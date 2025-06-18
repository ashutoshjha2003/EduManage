import React, { useState } from 'react';

const AddTeacherForm = ({ onAddTeacher, batches, courses }) => {
  const [teacherData, setTeacherData] = useState({
    teacherId: '',
    teacherName: '',
    password: '',
    teacherEmail: '',
    courseId: '',
    batchId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'courseId') {
      setTeacherData((prev) => ({
        ...prev,
        courseId: value,
        batchId: '',
      }));
    } else {
      setTeacherData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { batchId, ...rest } = teacherData;
      const formattedData = {
        ...rest,
        batchIds: [batchId],
      };

      await onAddTeacher(formattedData);

      setTeacherData({
        teacherId: '',
        teacherName: '',
        password: '',
        teacherEmail: '',
        courseId: '',
        batchId: '',
      });
    } catch (error) {
      console.error('Error adding teacher', error);
    }
  };

  const filteredBatches = teacherData.courseId
    ? batches.filter(
        (batch) =>
          Array.isArray(batch.courseIds) &&
          batch.courseIds.includes(teacherData.courseId)
      )
    : [];

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md gap-3"
    >
      <input
        type="text"
        name="teacherId"
        placeholder="Teacher ID"
        value={teacherData.teacherId}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-blue-50 text-center text-sm font-semibold placeholder-gray-500"
      />
      <input
        type="text"
        name="teacherName"
        placeholder="Teacher Name"
        value={teacherData.teacherName}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-blue-50 text-center text-sm font-semibold placeholder-gray-500"
      />
      <input
        type="email"
        name="teacherEmail"
        placeholder="Teacher Email"
        value={teacherData.teacherEmail}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-blue-50 text-center text-sm font-semibold placeholder-gray-500"
      />
      <input
        type="text"
        name="password"
        placeholder="Password"
        value={teacherData.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-blue-50 text-center text-sm font-semibold placeholder-gray-500"
      />

      <select
        name="courseId"
        value={teacherData.courseId}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-blue-50 text-sm font-semibold text-black"
      >
        <option value="" disabled>Select Course</option>
        {courses.map((course) => (
          <option key={course._id} value={course.courseId}>
            {course.courseName}
          </option>
        ))}
      </select>

      <select
        name="batchId"
        value={teacherData.batchId}
        onChange={handleChange}
        required
        disabled={!teacherData.courseId}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md bg-blue-50 text-sm font-semibold text-black ${
          !teacherData.courseId ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <option value="" disabled>
          {teacherData.courseId ? 'Select Batch' : 'Select Course First'}
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
        className="w-full mt-2 px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300"
      >
        Add Teacher
      </button>
    </form>
  );
};

export default AddTeacherForm;