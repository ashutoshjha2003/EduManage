import React, { useEffect, useState } from 'react';

const AdminViewBatches = () => {
  const [batches, setBatches] = useState([]);
  const [course, setCourse] = useState([]);

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const res = await fetch('http://localhost:8080/batches');
      const data = await res.json();
      setBatches(data);
    } catch (error) {
      console.error('Failed to fetch Batches:', error);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-100 to-white min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-bold text-indigo-900 mb-10 animate-fade-in mt-10 underline">📋 Batch Details</h2>

      <div className="w-full max-w-5xl bg-white p-10 rounded-3xl shadow-xl border border-gray-300 animate-fade-in">
        {batches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.map(batch => (
              <div key={course.courseId} className="bg-blue-50 border border-indigo-200 rounded-xl p-5 shadow-md">
                <strong className="text-lg block text-indigo-800 mb-1">{batch.batchName}</strong>
                <p className="text-sm text-gray-700">🧑‍🤝‍🧑 Batch ID: {batch.batchId}</p>
                <p className="text-sm text-gray-700">🧮 Strength: {batch.strength}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No Batch available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminViewBatches;