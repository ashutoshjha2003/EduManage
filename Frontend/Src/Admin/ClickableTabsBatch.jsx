import React, { useState } from 'react';

const ClickableTabs = ({ courses, batches }) => {
  const [activeTab, setActiveTab] = useState('');
  const [tabSelected, setTabSelected] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setTabSelected(true);
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center mb-5">
        <button
          className={`px-5 py-2 mr-2 font-bold text-gray-800 border-b-2 ${
            activeTab === 'courses'
              ? 'border-blue-500 bg-white'
              : 'border-transparent bg-white/40'
          }`}
          onClick={() => handleTabClick('courses')}
        >
          Courses
        </button>
        <button
          className={`px-5 py-2 font-bold text-gray-800 border-b-2 ${
            activeTab === 'batches'
              ? 'border-blue-500 bg-white'
              : 'border-transparent bg-white/40'
          }`}
          onClick={() => handleTabClick('batches')}
        >
          Batches
        </button>
      </div>

      {/* Courses Tab Content */}
      {tabSelected && activeTab === 'courses' && (
        <div className="bg-white/40 p-5 border border-gray-300 rounded-md">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Course ID</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Course Name</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.courseId}>
                  <td className="border border-gray-300 px-4 py-2">{course.courseId}</td>
                  <td className="border border-gray-300 px-4 py-2">{course.courseName}</td>
                  <td className="border border-gray-300 px-4 py-2">{course.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Batches Tab Content */}
      {tabSelected && activeTab === 'batches' && (
        <div className="bg-white/40 p-5 border border-gray-300 rounded-md mt-5">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Batch ID</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Batch Name</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Strength</th>
                <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">Course IDs</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch) => (
                <tr key={batch.batchId}>
                  <td className="border border-gray-300 px-4 py-2">{batch.batchId}</td>
                  <td className="border border-gray-300 px-4 py-2">{batch.batchName}</td>
                  <td className="border border-gray-300 px-4 py-2">{batch.strength}</td>
                  <td className="border border-gray-300 px-4 py-2">{batch.courseIds.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClickableTabs;