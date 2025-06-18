import React, { useState, useEffect, useRef } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-solid-svg-icons";
import {
  FcNook,
  FcCalendar,
  FcDataSheet,
  FcBusinessman,
  FcEnteringHeavenAlive,
  FcPrivacy,
} from "react-icons/fc";
import { Link, useLocation } from "react-router-dom";

const Logo = ({ src, alt, onClick }) => (
  <div className="cursor-pointer" onClick={onClick}>
    <img src={src} alt={alt} className="w-10 h-auto" />
  </div>
);

function App() {
  const location = useLocation();
  const userid = localStorage.getItem("userName");

  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userPanelOpen, setUserPanelOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const notificationRef = useRef();
  const userPanelRef = useRef();
  const navRef = useRef(); 

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleNotificationPanel = () => setNotificationOpen((prev) => !prev);
  const toggleUserPanel = () => setUserPanelOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) setMenuOpen(false);
    if (notificationRef.current && !notificationRef.current.contains(event.target)) setNotificationOpen(false);
    if (userPanelRef.current && !userPanelRef.current.contains(event.target)) setUserPanelOpen(false);
  }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getLinkStyle = (path) => {
    const isActive = location.pathname === path || hoveredLink === path;
    return `flex items-center gap-2 px-4 py-2 text-black text-sm font-semibold transition-all duration-300 rounded-md ${
      isActive ? "bg-indigo-100 border-l-[4px] border-indigo-500" : "hover:bg-gray-100"
    }`;
  };

  const getCurrentLinkName = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/profile":
        return "Profile";
      case "/attendance":
        return "Attendance";
      case "/timetable":
        return "Timetable";
      case "/course":
        return "Courses";
      case "/accounts":
        return "Account";
      case "/settings":
        return "Setting";
      default:
        return "";
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="flex justify-between items-center bg-gray-100 px-4 py-2 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center space-x-4">
          <img
            src="https://assets-global.website-files.com/625653855a98a355d49f4743/62565a4fcbde990d20496daf_Toggle%20Image.png"
            alt="Toggle Menu"
            className="w-10 cursor-pointer"
            onClick={toggleMenu}
          />
          <h2 className="text-lg font-semibold">{getCurrentLinkName()}</h2>
        </div>
        <div className="flex items-center space-x-4">
          {/* Notification Panel */}
          <div ref={notificationRef} className="relative">
            <FontAwesomeIcon
              icon={faBell}
              className="text-gray-700 text-xl cursor-pointer"
              onClick={toggleNotificationPanel}
            />
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-4 dropdown z-50">
                <ul>
                  <li>No new notifications</li>
                </ul>
              </div>
            )}
          </div>

          {/* User Panel */}
          <div ref={userPanelRef} className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="text-gray-700 text-xl cursor-pointer"
              onClick={toggleUserPanel}
            />
            {userPanelOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-4 dropdown z-50">
                <ul className="space-y-2">
                  <li className="text-sm font-semibold">Welcome, {userid}!</li>
                  <li>
                    <Link to="/profile" className="text-black no-underline">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signin"
                      onClick={handleLogout}
                      className="text-black no-underline"
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        ref={navRef}
        className={`fixed top-0 left-0 h-full bg-white shadow-md transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 pt-16 w-64`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <Link to="/" className="text-lg font-bold">
            U.M.S
          </Link>
          <img
            src="../Images/logo.jpeg"
            alt="Close Menu"
            className="w-5 cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        <nav className="flex flex-col gap-2 p-4">
          <Link to="/" className={getLinkStyle("/")}>
            <FcEnteringHeavenAlive className="text-2xl" /> Dashboard
          </Link>
          <Link to="/profile" className={getLinkStyle("/profile")}>
            <FcBusinessman className="text-2xl" /> Profile
          </Link>
          <Link to="/attendance" className={getLinkStyle("/attendance")}>
            <FcDataSheet className="text-2xl" /> Attendance
          </Link>
          <Link to="/timetable" className={getLinkStyle("/timetable")}>
            <FcCalendar className="text-2xl" /> Timetable
          </Link>
          <Link to="/course" className={getLinkStyle("/course")}>
            <FcNook className="text-2xl" /> View Courses
          </Link>
          <Link to="/accounts" onClick={handleLogout} className={getLinkStyle("/accounts")}>
            <FcPrivacy className="text-2xl" /> Logout
          </Link>
        </nav>
      </div>
    </>
  );
}

export default App;
