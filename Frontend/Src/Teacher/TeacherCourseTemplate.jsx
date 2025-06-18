import React, { useState } from 'react';
import axios from 'axios';

const Course = () => {
  const [selectedCourse, setSelectedCourse] = useState('CS101');
  const [selectedBatch, setSelectedBatch] = useState('Batch1');
  const [activeTab, setActiveTab] = useState('notices');

  const courses = [
    { courseid: 'CS101', coursename: 'Computer Science 101' },
    { courseid: 'ENG201', coursename: 'English 201' },
  ];

  const batches = ['Batch1', 'Batch2', 'Batch3'];

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>

      <div className="mb-6 space-y-4">
        <div>
          <label htmlFor="course" className="block font-semibold text-gray-700 mb-1">Select Course:</label>
          <select
            id="course"
            value={selectedCourse}
            onChange={handleCourseChange}
            className="w-full px-4 py-2 border rounded-lg bg-white"
          >
            {courses.map((course) => (
              <option key={course.courseid} value={course.courseid}>
                {course.coursename}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="batch" className="block font-semibold text-gray-700 mb-1">Select Batch:</label>
          <select
            id="batch"
            value={selectedBatch}
            onChange={handleBatchChange}
            className="w-full px-4 py-2 border rounded-lg bg-white"
          >
            {batches.map((batch) => (
              <option key={batch} value={batch}>
                {batch}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <button onClick={() => setActiveTab('notices')} className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">
          Add Notices
        </button>
        <button onClick={() => setActiveTab('quizzes')} className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">
          Add Quizzes
        </button>
        <button onClick={() => setActiveTab('grade')} className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">
          Grade Quizzes
        </button>
        <button onClick={() => setActiveTab('lectures')} className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">
          Add Lectures
        </button>
      </div>

      {activeTab === 'notices' && <AddNotice courseId={selectedCourse} batchId={selectedBatch} />}
      {activeTab === 'quizzes' && <AddQuiz courseId={selectedCourse} batchId={selectedBatch} />}
      {activeTab === 'grade' && <GradeQuiz courseId={selectedCourse} batchId={selectedBatch} />}
      {activeTab === 'lectures' && <AddLecture courseId={selectedCourse} batchId={selectedBatch} />}
    </div>
  );
};

// ------------------- AddNotice -------------------

const AddNotice = ({ courseId, batchId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleAddNotice = async () => {
    if (!title || !content) {
      setMessage('Title and content are required!');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/notices', {
        title,
        content,
        courseId,
        batchId,
      });
      setMessage('Notice added successfully!');
      setTitle('');
      setContent('');
    } catch (error) {
      setMessage('Error adding notice: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="bg-blue-100 text-gray-800 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Add Notice</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-3 border rounded h-24"
      />
      <button
        onClick={handleAddNotice}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Notice
      </button>
      {message && <p className="mt-2 text-sm text-red-600">{message}</p>}
    </div>
  );
};

// ------------------- AddLecture -------------------

const AddLecture = ({ courseId, batchId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [materials, setMaterials] = useState('');
  const [message, setMessage] = useState('');

  const handleAddLecture = async () => {
    if (!title || !description || !videoUrl || !courseId || !batchId) {
      setMessage('All fields are required!');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/lectures', {
        title,
        description,
        videoUrl,
        materials: materials.split(',').map(item => item.trim()),
        courseId,
        batchId,
      });
      setMessage('Lecture added successfully!');
      setTitle('');
      setDescription('');
      setVideoUrl('');
      setMaterials('');
    } catch (error) {
      setMessage('Error adding lecture: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="bg-green-100 text-gray-800 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Add Lecture</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-3 border rounded h-24"
      />
      <input
        type="text"
        placeholder="Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      />
      <input
        type="text"
        placeholder="Materials (comma-separated)"
        value={materials}
        onChange={(e) => setMaterials(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
      />
      <button
        onClick={handleAddLecture}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add Lecture
      </button>
      {message && <p className="mt-2 text-sm text-red-600">{message}</p>}
    </div>
  );
};

const AddQuiz = () => <div className="p-4 text-gray-500">[AddQuiz Component Placeholder]</div>;
const GradeQuiz = () => <div className="p-4 text-gray-500">[GradeQuiz Component Placeholder]</div>;

export default Course;