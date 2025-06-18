import React from 'react';
import { useState } from 'react';
import AddStudentForm from './addstudentform';
import AddTeacherForm from './addteacherform';

const AdminPanel = ({ onAddStudent, onAddTeacher, batches, courses, studentdatas = [], teacherdatas = [] }) => {
  const [activeTab, setActiveTab] = useState('');

  return (
    <div className="p-8 bg-gradient-to-br from-blue-100 to-white flex flex-col items-center">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl mb-12">
        {[
          { key: 'addStudent', label: 'Add Student', img: '../../Images/add student.png' },
          { key: 'addTeacher', label: 'Add Teacher', img: '../../Images/add teacher.jpg' },
        ].map(({ key, label, img }) => (
          <div
            key={key}
            onClick={() => setActiveTab(key)}
            className={`p-6 rounded-2xl text-center cursor-pointer font-semibold text-lg flex flex-col items-center transition-all duration-300 shadow-md hover:-translate-y-1 hover:bg-indigo-600 hover:text-white ${
              activeTab === key ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-700 border border-indigo-600'
            }`}
          >
            <img
              src={img}
              alt={label}
              className="w-14 h-14 mb-3 object-contain rounded-full shadow-md transition-all"
            />
            {label}
          </div>
        ))}
      </div>

      <div className="w-full max-w-5xl bg-white p-10 rounded-3xl shadow-xl border border-gray-300 animate-fade-in">
        {activeTab === 'addStudent' && (
          <>
            <h3 className="text-2xl font-semibold text-indigo-700 mb-6 border-l-4 border-indigo-600 pl-4">👨‍🎓 Add Student</h3>
            <AddStudentForm onAddStudent={onAddStudent} batches={batches} courses={courses} />
          </>
        )}

        {activeTab === 'addTeacher' && (
          <>
            <h3 className="text-2xl font-semibold text-indigo-700 mb-6 border-l-4 border-indigo-600 pl-4">👩‍🏫 Add Teacher</h3>
            <AddTeacherForm onAddTeacher={onAddTeacher} batches={batches} courses={courses} />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;