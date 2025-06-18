import React, { useState } from 'react';
import axios from 'axios';

const AddQuiz = ({ courseId, batchId }) => {
    const [quizName, setQuizName] = useState('');
    const [quizTime, setQuizTime] = useState('');
    const [grade, setGrade] = useState('');
    const [link, setLink] = useState('');
    const [message, setMessage] = useState('');

    const handleAddQuiz = async () => {
        if (!quizName || !quizTime || !grade || !link) {
            setMessage('⚠️ Please fill in all fields.');
            return;
        }

        try {
            const quizId = Date.now().toString().slice(0, 5) + Math.floor(Math.random() * 1000).toString();
            await axios.post('http://localhost:8080/quizzes', {
                courseId,
                batchId,
                quizName,
                quizTime,
                quizId,
                grade,
                link
            });

            setMessage('✅ Quiz added successfully!');
            setQuizName('');
            setQuizTime('');
            setGrade('');
            setLink('');
        } catch (error) {
            setMessage('❌ Error adding quiz: ' + error.message);
        }
    };

    return (
        <div className="bg-white/20 backdrop-blur-lg border border-white/30 text-black w-[90%] max-w-md mx-auto mt-12 p-8 rounded-xl shadow-2xl text-center">
            <h2 className="text-2xl font-bold mb-6 drop-shadow-md">📝 Add a New Quiz</h2>

            <input
                type="text"
                placeholder="Quiz Name"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
                className="w-full px-4 py-3 mb-4 rounded-lg bg-white/20 placeholder-black text-black text-center focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
            />

            <input
                type="time"
                value={quizTime}
                onChange={(e) => setQuizTime(e.target.value)}
                className="w-full px-4 py-3 mb-4 rounded-lg bg-white/20 text-black text-center focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
            />

            <input
                type="text"
                placeholder="Quiz Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full px-4 py-3 mb-4 rounded-lg bg-white/20 placeholder-black text-black text-center focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
            />

            <input
                type="number"
                placeholder="Total Marks"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-4 py-3 mb-6 rounded-lg bg-white/20 placeholder-black text-black text-center focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
            />

            <button
                onClick={handleAddQuiz}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg text-white font-semibold hover:from-orange-500 hover:to-pink-500 transform hover:scale-105 transition duration-300"
            >
                ➕ Add Quiz
            </button>

            {message && (
                <p className={`mt-4 font-bold ${message.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default AddQuiz;