import React, { useState } from 'react';

const ClickableTabs = ({ students, teachers }) => {
  const [activeTab, setActiveTab] = useState('');
  const [tabSelected, setTabSelected] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setTabSelected(true);
  };

  return (
    <div>
      {/* Tabs Header */}
      <div className="flex justify-center mb-5">
        <button
          onClick={() => handleTabClick('students')}
          className={`px-5 py-2 mr-2 font-bold text-gray-800 border-b-2 ${
            activeTab === 'students'
              ? 'border-blue-500 bg-white'
              : 'border-transparent bg-white/35'
          }`}
        >
          Students
        </button>
        <button
          onClick={() => handleTabClick('teachers')}
          className={`px-5 py-2 font-bold text-gray-800 border-b-2 ${
            activeTab === 'teachers'
              ? 'border-blue-500 bg-white'
              : 'border-transparent bg-white/35'
          }`}
        >
          Teachers
        </button>
      </div>

      {/* Students Tab */}
      {tabSelected && activeTab === 'students' && (
        <div className="bg-white/35 p-5 border border-gray-300">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 px-3 py-2 bg-gray-100 text-left">Student ID</th>
                <th className="border border-gray-300 px-3 py-2 bg-gray-100 text-left">Student Name</th>
                <th className="border border-gray-300 px-3 py-2 bg-gray-100 text-left">Batch</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.studentId}>
                  <td className="border border-gray-300 px-3 py-2">{student.studentId}</td>
                  <td className="border border-gray-300 px-3 py-2">{student.studentName}</td>
                  <td className="border border-gray-300 px-3 py-2">{student.batch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Teachers Tab */}
      {tabSelected && activeTab === 'teachers' && (
        <div className="bg-white/35 p-5 border border-gray-300">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 px-3 py-2 bg-gray-100 text-left">Teacher ID</th>
                <th className="border border-gray-300 px-3 py-2 bg-gray-100 text-left">Teacher Name</th>
                <th className="border border-gray-300 px-3 py-2 bg-gray-100 text-left">Course IDs</th>
                <th className="border border-gray-300 px-3 py-2 bg-gray-100 text-left">Batch IDs</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher._id}>
                  <td className="border border-gray-300 px-3 py-2">{teacher.teacherId}</td>
                  <td className="border border-gray-300 px-3 py-2">{teacher.teacherName}</td>
                  <td className="border border-gray-300 px-3 py-2">{teacher.courseId}</td>
                  <td className="border border-gray-300 px-3 py-2">{teacher.batchIds.join(', ')}</td>
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