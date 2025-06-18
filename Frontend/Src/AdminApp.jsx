import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import { FcBusinessContact, FcPodiumWithSpeaker,FcPodiumWithAudience, FcNook, FcCalendar, FcDataSheet, FcLeave, FcEnteringHeavenAlive, FcPlus, FcPrivacy } from "react-icons/fc";
import { Link, useLocation } from 'react-router-dom';

function AdminApp() {
  const profileData = {
    name: 'John Doe',
    email: 'hi@gmail.com'
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userPanelOpen, setUserPanelOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const navRef = useRef();
  const notificationRef = useRef();
  const userPanelRef = useRef();
  const location = useLocation();
  const userid = localStorage.getItem('userName');

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handlelogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  const toggleNotificationPanel = () => setNotificationOpen(!notificationOpen);
  const toggleUserPanel = () => setUserPanelOpen(!userPanelOpen);

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) setMenuOpen(false);
    if (notificationRef.current && !notificationRef.current.contains(event.target)) setNotificationOpen(false);
    if (userPanelRef.current && !userPanelRef.current.contains(event.target)) setUserPanelOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getLinkStyle = (path) => {
    const base = "flex items-center space-x-2 px-4 py-2 rounded-lg text-black hover:bg-gray-100 transition-all";
    const active = "border-l-4 border-blue-500 bg-blue-100 font-semibold";
    return location.pathname === path || hoveredLink === path ? `${base} ${active}` : base;
  };

  const getCurrentLinkName = () => {
    switch (location.pathname) {
      case '/admin': return 'Dashboard';
      case '/adminprofile': return 'Approve Leave';
      case '/adminattendance': return 'Attendance';
      case '/admintimetable': return 'Timetable';
      case '/admincourse': return 'Add Students/Teachers';
      case '/adminadd': return 'Add Batches/Courses';
      default: return '';
    }
  };

  return (
    <>
      {/* TOP NAVBAR FIXED */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-white shadow-md h-16">
        <div className="flex items-center gap-4">
          <img
            src="https://assets-global.website-files.com/625653855a98a355d49f4743/62565a4fcbde990d20496daf_Toggle%20Image.png"
            alt="Toggle Menu"
            className="w-8 cursor-pointer"
            onClick={toggleMenu}
          />
          <h2 className="text-xl font-bold">{getCurrentLinkName()}</h2>
        </div>
        <div className="flex gap-4 items-center">
          <div ref={notificationRef} className="relative">
            <FontAwesomeIcon icon={faBell} className="cursor-pointer" onClick={toggleNotificationPanel} />
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
                <ul className="p-2 text-sm">
                  <li>No new notifications</li>
                </ul>
              </div>
            )}
          </div>
          <div ref={userPanelRef} className="relative">
            <FontAwesomeIcon icon={faUser} className="cursor-pointer" onClick={toggleUserPanel} />
            {userPanelOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
                <ul className="p-2 text-sm">
                  <li>Welcome, {userid}!</li>
                  <li><Link className="block py-1 text-black" to="/adminprofile">Leave</Link></li>
                  <li><Link className="block py-1 text-black" onClick={handlelogout} to="/signin">Logout</Link></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SIDE NAVIGATION DRAWER */}
      <div
        ref={navRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40 pt-16`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <Link to="/" className="text-lg font-bold">U.M.S</Link>
          <img
            src="../Images/logo.jpeg"
            alt="Close Menu"
            className="w-5 cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        <nav className="flex flex-col gap-2 p-4">
          <Link to="/admin" className={getLinkStyle('/admin')}><FcEnteringHeavenAlive className="text-2xl" /> Dashboard</Link>
          <Link to="/adminprofile" className={getLinkStyle('/adminprofile')}><FcLeave className="text-2xl" /> Leave</Link>
          <Link to="/adminattendance" className={getLinkStyle('/adminattendance')}><FcDataSheet className="text-2xl" /> Attendance</Link>
          <Link to="/admintimetable" className={getLinkStyle('/admintimetable')}><FcCalendar className="text-2xl" /> Timetable</Link>
          <Link to="/admincourse" className={getLinkStyle('/admincourse')}><FcPlus className="text-2xl" /> Add Student/Teacher</Link>
          <Link to="/adminadd" className={getLinkStyle('/adminadd')}><FcPlus className="text-2xl" /> Add Batch/Course</Link>
          <Link to="/viewStudents" className={getLinkStyle('/viewStudents')}><FcPodiumWithAudience className="text-2xl" /> View Students</Link>
          <Link to="/viewTeachers" className={getLinkStyle('/viewTeachers')}><FcPodiumWithSpeaker className="text-2xl" /> View Teachers</Link>
          <Link to="/viewBatches" className={getLinkStyle('/viewBatches')}><FcBusinessContact className="text-2xl" /> View Batches</Link>
          <Link to="/viewCourses" className={getLinkStyle('/viewCourses')}><FcNook className="text-2xl" /> View Courses</Link>
          <Link to="/signin" onClick={handlelogout} className={getLinkStyle('/signin')}><FcPrivacy className="text-2xl" /> Logout</Link>
        </nav>
      </div>
    </>
  );
}

export default AdminApp;