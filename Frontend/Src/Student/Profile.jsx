import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faKey, faGraduationCap, faIdBadge, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    userName: '',
    password: '',
    batch: '',
    courseid: '',
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    const userid = localStorage.getItem('userName');
    fetch(`http://localhost:8080/profiledata?name=${userid}`)
      .then((response) => response.json())
      .then((data) =>
        setProfileData({
          name: data.name,
          email: data.email,
          userName: data.userName,
          password: data.password,
          batch: data.batch,
          courseid: data.courseIds,
        })
      )
      .catch((error) => console.error('Error fetching profile data:', error));
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-50 mt-20 p-10 flex justify-center rounded-2xl w-[100vh] animate-fadeIn ">
      <div className="bg-white rounded-[28px] p-10 w-full max-w-4xl shadow-2xl border border-gray-200  transition-all duration-300">
        <div className="flex justify-center mb-8">
          <img
            src="https://www.kindpng.com/picc/m/32-327818_bachelors-degree-icon-png-clipart-png-download-bachelors.png"
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-200 object-cover shadow-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        <h2 className="text-center text-3xl text-gray-800 font-bold mb-10">My Profile</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-semibold mb-2 flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-2 text-indigo-500" /> Name
            </label>
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 flex items-center shadow-sm focus-within:ring-2 focus-within:ring-indigo-200">
              <input type="text" value={profileData.name} readOnly className="bg-transparent w-full text-black outline-none" />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-semibold mb-2 flex items-center">
              <FontAwesomeIcon icon={faIdBadge} className="mr-2 text-indigo-500" /> User Name
            </label>
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 flex items-center shadow-sm">
              <input type="text" value={profileData.userName} readOnly className="bg-transparent w-full text-black outline-none" />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-semibold mb-2 flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-indigo-500" /> Email
            </label>
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 flex items-center shadow-sm">
              <input type="email" value={profileData.email} readOnly className="bg-transparent w-full text-black outline-none" />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-semibold mb-2 flex items-center">
              <FontAwesomeIcon icon={faKey} className="mr-2 text-indigo-500" /> Password
            </label>
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 flex items-center shadow-sm">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                value={profileData.password}
                readOnly
                className="bg-transparent w-full text-black outline-none"
              />
              <FontAwesomeIcon
                icon={isPasswordVisible ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
                className="ml-4 cursor-pointer text-indigo-500 hover:scale-110 transition-transform duration-200"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-semibold mb-2 flex items-center">
              <FontAwesomeIcon icon={faGraduationCap} className="mr-2 text-indigo-500" /> Batch
            </label>
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 flex items-center shadow-sm">
              <input type="text" value={profileData.batch} readOnly className="bg-transparent w-full text-black outline-none" />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-semibold mb-2 flex items-center">
              <FontAwesomeIcon icon={faIdBadge} className="mr-2 text-indigo-500" /> Course ID
            </label>
            <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 flex items-center shadow-sm">
              <input type="text" value={profileData.courseid} readOnly className="bg-transparent w-full text-black outline-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;