import React, { useState, useEffect } from 'react';

const AdminViewTeachers = () => {
const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await fetch('http://localhost:8080/teachers');
      const data = await res.json();
      setTeachers(data);
    } catch (error) {
      console.error('Failed to fetch teachers:', error);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-100 to-white min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-bold text-indigo-900 mb-10 animate-fade-in mt-10 underline">📋 Teacher Details</h2>

      <div className="w-full max-w-5xl bg-white p-10 rounded-3xl shadow-xl border border-gray-300 animate-fade-in">
        {teachers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map(teacher => (
              <div key={teacher.teacherId} className="bg-blue-50 border border-indigo-200 rounded-xl p-5 shadow-md">
                <strong className="text-lg block text-indigo-800 mb-1">{teacher.teacherName}</strong>
                <p className="text-sm text-gray-700">🆔 Teacher ID: {teacher.teacherId}</p>
                <p className="text-sm text-gray-700">📧 Teacher Email: {teacher.teacherEmail}</p>
                <p className="text-sm text-gray-700">🪪 Course ID: {teacher.courseId}</p>
                <p className="text-sm text-gray-700">🧑‍🤝‍🧑 Batch ID: {teacher.batchIds}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No teacher data available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminViewTeachers;