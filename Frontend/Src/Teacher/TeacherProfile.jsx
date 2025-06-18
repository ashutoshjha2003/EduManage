import React from 'react';
import ApplyLeave from './ApplyLeave.jsx';

const TeacherProfile = () => {
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-20">
      <div className="w-full max-w-5xl px-4">
        <div className="mt-16 ml-48">
          <ApplyLeave />
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;