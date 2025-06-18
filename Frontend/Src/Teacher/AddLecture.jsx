import React, { useState } from 'react';
import axios from 'axios';

const AddLecture = ({ courseId, batchId }) => {
  const teacherName = localStorage.getItem('userName') || 'Default Teacher';
  const teacherId = localStorage.getItem("userName") || 'Default Teacher Id';
  const lectureId = Date.now().toString().slice(0, 5) + Math.floor(Math.random() * 1000).toString();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleAddLecture = async () => {
    if (!title || !courseId || !batchId) {
      setMessage('⚠️ Title, Course ID, and Batch ID are required!');
      return;
    }

    try {
      await axios.post('http://localhost:8080/lectures', {
        lectureId,
        title,
        description,
        videoUrl,
        courseId,
        batchId,
        teacherId,
        teacherName,
      });

      setMessage('✅ Lecture added successfully!');
      setTitle('');
      setDescription('');
      setVideoUrl('');
    } catch (error) {
      setMessage('❌ Error adding lecture: ' + error.message);
    }
  };

  return (
    <div
      className="min-h-[90vh] w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-8"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1581090700227-1e8c0d07f263?auto=format&fit=crop&w=1470&q=80')`,
      }}
    >
      <div className="bg-white/30 backdrop-blur-xl shadow-2xl rounded-3xl p-10 max-w-xl w-full text-black">
        <h2 className="text-3xl font-extrabold text-center mb-6 drop-shadow-lg">
          🎥 Add a New Lecture
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Lecture Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/30 placeholder-black text-black focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <textarea
            placeholder="Enter Lecture Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 h-28 rounded-xl bg-white/40 border border-white/30 placeholder-black text-black resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="text"
            placeholder="Enter Video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/40 border border-white/30 placeholder-black text-black focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button
            onClick={handleAddLecture}
            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-3 rounded-xl shadow-lg transition duration-300"
          >
            ➕ Add Lecture
          </button>

          {message && (
            <p
              className={`mt-4 text-center font-semibold ${
                message.includes('✅') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddLecture;