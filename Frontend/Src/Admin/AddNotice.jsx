import React, { useState } from 'react';

const AddNotice = ({ courseId, batchId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddNotice = () => {
    console.log(`Adding notice for course ${courseId}, batch ${batchId}:`, { title, content });
    setTitle('');
    setContent('');
  };

  return (
    <div className="bg-[#404a6d8a] text-gray-900 p-6 rounded-md mt-12 w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-white">Add Notice</h2>
      
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full mb-3 p-2 bg-[#a6afca] text-black rounded-md placeholder-gray-700"
      />
      
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="block w-full mb-4 p-2 bg-[#a6afca] text-black rounded-md placeholder-gray-700 h-24"
      />

      <button
        onClick={handleAddNotice}
        className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Add Notice
      </button>
    </div>
  );
};

export default AddNotice;