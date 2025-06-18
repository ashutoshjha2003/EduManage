// TeacherApp.jsx
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-solid-svg-icons";
import {FcBusinessContact, FcPodiumWithSpeaker, FcPodiumWithAudience, FcNook, FcCalendar, FcDataSheet, FcLeave, FcEnteringHeavenAlive, FcPlus, FcPrivacy,FcAddImage, FcBarChart, FcFinePrint } from "react-icons/fc";
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

function TeacherApp() {
  const profileData = {
    name: "John Doe",
    email: "hi@gmail.com",
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userPanelOpen, setUserPanelOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const navRef = useRef();
  const notificationRef = useRef();
  const userPanelRef = useRef();
  const location = useLocation();
  const userid = localStorage.getItem("userName");

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };
  const toggleNotificationPanel = () => setNotificationOpen(!notificationOpen);
  const toggleUserPanel = () => setUserPanelOpen(!userPanelOpen);

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target))
      setMenuOpen(false);
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target) &&
      !event.target.classList.contains("icon-bell")
    )
      setNotificationOpen(false);
    if (
      userPanelRef.current &&
      !userPanelRef.current.contains(event.target) &&
      !event.target.classList.contains("icon-user")
    )
      setUserPanelOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getLinkStyle = (path) => {
    const base =
      "flex items-center gap-2 p-3 rounded-md hover:bg-gray-100 transition";
    const active = "border-l-4 border-purple-600 bg-gray-100 font-semibold";
    return `${base} ${
      location.pathname === path || hoveredLink === path ? active : ""
    }`;
  };

  const getCurrentLinkName = () => {
    switch (location.pathname) {
      case "/teacher":
        return "Dashboard";
      case "/teacherprofile":
        return "Apply leave";
      case "/teacherattendance":
        return "Attendance";
      case "/teachertimetable":
        return "Timetable";
      case "/teachercourse":
        return "Courses";
      case "/teacheraccounts":
        return "Account";
      case "/teachersettings":
        return "Setting";
      default:
        return "";
    }
  };

  return (
    <div>
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
            <FontAwesomeIcon
              icon={faBell}
              className="cursor-pointer"
              onClick={toggleNotificationPanel}
            />
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
                <ul className="p-2 text-sm">
                  <li>No new notifications</li>
                </ul>
              </div>
            )}
          </div>
          <div ref={userPanelRef} className="relative">
            <FontAwesomeIcon
              icon={faUser}
              className="cursor-pointer"
              onClick={toggleUserPanel}
            />
            {userPanelOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
                <ul className="p-2 text-sm">
                  <li>Welcome {userid}!</li>
                  <li>
                    <Link className="block py-1 text-black" to="/adminprofile">
                      Leave
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block py-1 text-black"
                      onClick={handlelogout}
                      to="/signin"
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

      {/* SIDE NAVIGATION DRAWER */}
      <div
        ref={navRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 pt-16`}
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
          <Link to="/teacher" className={getLinkStyle("/teacher")}>
            <FcEnteringHeavenAlive className="text-2xl" /> Dashboard
          </Link>
          <Link
            to="/teacherprofile"
            className={getLinkStyle("/teacherprofile")}
          >
            <FcLeave className="text-2xl" /> Leave
          </Link>
          <Link
            to="/teacherattendance"
            className={getLinkStyle("/teacherattendance")}
          >
            <FcDataSheet className="text-2xl" /> Attendance
          </Link>
          <Link
            to="/teachertimetable"
            className={getLinkStyle("/teachertimetable")}
          >
            <FcCalendar className="text-2xl" /> Timetable
          </Link>
          <Link to="/teacheraddlecture" className={getLinkStyle("/teacheraddlecture")}>
            <FcNook className="text-2xl" /> Add Lecture
          </Link>
          <Link to="/teacheraddnotice" className={getLinkStyle("/teacheraddnotice")}>
            <FcAddImage className="text-2xl" /> Add Notice
          </Link>
          <Link to="/teacheraddgradequize" className={getLinkStyle("/teacheraddgradequize")}>
            <FcBarChart className="text-2xl" /> Add Grade Quize
          </Link>
          <Link to="/teacheraddquize" className={getLinkStyle("/teacheraddquize")}>
            <FcFinePrint className="text-2xl" /> Add Quize
          </Link>
          <Link
            to="/signin"
            onClick={handlelogout}
            className={getLinkStyle("/signin")}
          >
            <FcPrivacy className="text-2xl" /> Logout
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default TeacherApp;
