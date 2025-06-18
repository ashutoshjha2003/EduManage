import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import ProgressBar from "./ProgressBar";
import Session from "./Session";
import Events from "./Events";

function StudentDashboard() {
  const [profileData, setProfileData] = useState({ name: "", email: "" });
  const [progressBarData, setProgressBarData] = useState([]);
  const [sessionData, setSessionData] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [facultyData, setFacultyData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeCard, setActiveCard] = useState(null);

  const userid = localStorage.getItem("userName");

useEffect(() => {
  const fetchData = async () => {
    try {
      const profileRes = await fetch(`http://localhost:8080/profiledata?name=${userid}`);
      if (!profileRes.ok) throw new Error(`Profile fetch failed: ${profileRes.status}`);
      const profileData = await profileRes.json();
      setProfileData({ name: profileData.name, email: profileData.email });

      const progressRes = await fetch(`http://localhost:8080/studentprogress?name=${userid}`);
      const progressData = await progressRes.json();
      setProgressBarData(progressData);

      const sessionsRes = await fetch(`http://localhost:8080/studentsessions?name=${userid}`);
      const sessionsData = await sessionsRes.json();
      setSessionData(sessionsData);
      filterSessionsByDay(new Date(), sessionsData);

      const facultyRes = await fetch(`http://localhost:8080/studentfaculty?name=${userid}`);
      const facultyData = await facultyRes.json();
      setFacultyData(facultyData);

      const eventsRes = await fetch(`http://localhost:8080/studentquizes?name=${userid}`);
      const eventData = await eventsRes.json();
      setEventData(eventData);

    } catch (err) {
      console.error("Error fetching student dashboard data:", err);
    }
  };

  fetchData();
}, []);


  const getDayIndex = (day) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days.indexOf(day);
  };

  const filterSessionsByDay = (date, sessions = sessionData) => {
    const dayIndex = date.getDay();
    const filtered = sessions.filter((session) => getDayIndex(session.day) === dayIndex);
    setFilteredSessions(filtered);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    filterSessionsByDay(date);
  };

  const toggleCard = (card) => {
    setActiveCard(activeCard === card ? null : card);
  };

  return (
    <div className="mt-24 ml-20 p-10 bg-gradient-to-br from-blue-100 to-white rounded-3xl shadow-xl flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-1">Welcome, {profileData.name}</h1>
      <h4 className="text-gray-500 font-medium mb-10">({profileData.email})</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        <CardItem
          title="📊 Attendance Summary"
          imgSrc="../../Images/Attendence.jpg"
          active={activeCard === "progress"}
          onClick={() => toggleCard("progress")}
        >
          <ProgressBar data={progressBarData} />
        </CardItem>

        <CardItem
          title="📚 Today's Sessions"
          imgSrc="../../Images/today-session.jpg"
          active={activeCard === "sessions"}
          onClick={() => toggleCard("sessions")}
        >
          <Session sessions={filteredSessions} />
        </CardItem>

        <CardItem
          title="👩‍🏫 Teachers"
          imgSrc="../../Images/Teachers.png"
          active={activeCard === "faculty"}
          onClick={() => toggleCard("faculty")}
        >
          {facultyData.map((faculty, idx) => (
            <div key={idx} className="bg-blue-50 p-4 mb-3 rounded-lg shadow-md">
              <p className="text-gray-800 text-sm mb-1"><span className="font-semibold text-blue-600">👤 Name:</span> {faculty.name}</p>
              <p className="text-gray-800 text-sm mb-1"><span className="font-semibold text-blue-600">🆔 ID:</span> {faculty.userid}</p>
              <p className="text-gray-800 text-sm"><span className="font-semibold text-blue-600">📘 Course:</span> {faculty.course}</p>
            </div>
          ))}
        </CardItem>

        <CardItem
          title="🗓️ Calendar"
          imgSrc="../../Images/Calender.jpg"
          active={activeCard === "calendar"}
          onClick={() => toggleCard("calendar")}
        >
          <div className="p-4 bg-gray-50 rounded-xl shadow-inner mt-2">
            <Calendar onChange={handleDateChange} value={selectedDate} className="w-full border-none" />
          </div>
        </CardItem>

        <CardItem
          title="📅 Upcoming Events"
          imgSrc="../../Images/Upcoming Events.png"
          active={activeCard === "events"}
          onClick={() => toggleCard("events")}
        >
          <Events event={eventData} />
        </CardItem>
      </div>
    </div>
  );
}

function CardItem({ title, imgSrc, active, onClick, children }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-all duration-300 ease-in-out p-6 rounded-2xl border-2 shadow-md text-center ${
        active ? "bg-indigo-600 text-white shadow-lg" : "bg-white text-gray-800 border-indigo-600"
      } hover:bg-indigo-600 hover:text-white hover:-translate-y-1`}
    >
      <img
        src={imgSrc}
        alt="icon"
        className="w-16 h-16 mx-auto mb-3 rounded-full object-contain shadow-md transition-transform"
      />
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <div
        className={`transition-all overflow-hidden duration-300 ease-in-out ${
          active ? "max-h-[1000px] opacity-100 pt-5" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default StudentDashboard;