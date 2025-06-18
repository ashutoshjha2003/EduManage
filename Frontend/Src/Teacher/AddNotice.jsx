import React, { useState } from 'react';
import axios from 'axios';

const AddNotice = ({ courseId, batchId }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    const handleAddNotice = async () => {
        if (!title || !content) {
            setMessage('⚠️ Title and Content are required!');
            return;
        }

        try {
            await axios.post('http://localhost:8080/notices', {
                courseId,
                batchId,
                title,
                content,
            });
            setMessage('✅ Notice added successfully!');
            setTitle('');
            setContent('');
        } catch (error) {
            setMessage('❌ Error adding notice: ' + error.message);
        }
    };

    return (
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl w-[90%] max-w-md mx-auto mt-12 p-10 rounded-2xl text-center transition-transform duration-200 text-black">
            <h2 className="text-2xl font-bold mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">📢 Add Notice</h2>

            <input
                type="text"
                placeholder="Notice Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 mb-4 rounded-xl bg-white/20 text-black placeholder-black text-center focus:outline-none focus:ring-2 focus:ring-white focus:shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-all duration-300"
            />

            <textarea
                placeholder="Write your notice here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 mb-6 rounded-xl bg-white/20 text-Black placeholder-black text-center resize-none h-28 focus:outline-none focus:ring-2 focus:ring-white focus:shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-all duration-300"
            />

            <button
                onClick={handleAddNotice}
                className="px-8 py-3 font-bold rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 shadow-lg hover:from-pink-600 hover:to-orange-600 transform hover:scale-105 transition duration-300"
            >
                ➕ Add Notice
            </button>

            {message && (
                <p
                    className={`mt-4 font-bold ${
                        message.includes('✅')
                            ? 'text-green-400 drop-shadow-[0_0_10px_rgba(39,174,96,0.8)]'
                            : 'text-red-400 drop-shadow-[0_0_10px_rgba(231,76,60,0.8)]'
                    }`}
                >
                    {message}
                </p>
            )}
        </div>
    );
};

export default AddNotice;