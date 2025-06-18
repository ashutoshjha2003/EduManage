import React, { useState, useEffect } from 'react';

const AdminViewStudents = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:8080/students');
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-100 to-white min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-bold text-indigo-900 mb-10 animate-fade-in mt-10 underline">📋 Student Details</h2>

      <div className="w-full max-w-5xl bg-white p-10 rounded-3xl shadow-xl border border-gray-300 animate-fade-in">
        {students.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map(student => (
              <div key={student.studentId} className="bg-blue-50 border border-indigo-200 rounded-xl p-5 shadow-md">
                <strong className="text-lg block text-indigo-800 mb-1">{student.studentName}</strong>
                <p className="text-sm text-gray-700">🆔 Student ID: {student.studentId}</p>
                <p className="text-sm text-gray-700">📧 Email: {student.studentEmail}</p>
                <p className="text-sm text-gray-700">🧑‍🤝‍🧑 Batch ID: {student.batch}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No student data available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminViewStudents;