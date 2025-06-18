import React, { useState, useEffect } from "react";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("");
  const [lectures, setLectures] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [batches, setBatches] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const userid = localStorage.getItem("userName");

  useEffect(() => {
    if (activeTab === "viewSessions") fetchSessions();
    else if (activeTab === "viewBatches") fetchBatches();
    else if (activeTab === "viewLeaves") fetchLeaves();
    else if (activeTab === "viewLectures") fetchLectures();
  }, [activeTab]);

  const fetchSessions = async () => {
    try {
      const res = await fetch(`http://localhost:8080/teachersessions?name=${userid}`);
      const data = await res.json();
      setSessions(data);
    } catch (error) {
      console.error("Failed to fetch Session:", error);
    }
  };

  const fetchBatches = async () => {
    try {
      const res = await fetch(`http://localhost:8080/teacherbatches?name=${userid}`);
      const data = await res.json();
      setBatches(data);
    } catch (error) {
      console.error("Failed to fetch Batch:", error);
    }
  };

  const fetchLeaves = async () => {
    try {
      const res = await fetch(`http://localhost:8080/teacherleaves?name=${userid}`);
      const data = await res.json();
      setLeaves(data);
    } catch (error) {
      console.error("Failed to fetch Leaves:", error);
    }
  };

  const fetchLectures = async () => {
    try {
      const res = await fetch(`http://localhost:8080/teacherlectures?name=${userid}`);
      const data = await res.json();
      setLectures(data);
    } catch (error) {
      console.error("Failed to fetch Lectures: ", error);
    }
  };

  return (
    <div className="bg-white min-h-screen flex justify-center rounded-[30px] p-10"> {/*change*/}
      <div className="w-full max-w-[1400px] p-5">
        <div className="p-20 pt-20 font-sans bg-gradient-to-br from-[#e3efff] to-white flex flex-col items-center rounded-[20px] shadow-xl animate-fade-in">
          <h1 className="text-4xl font-bold text-[#2c3e50] mb-8 text-center">Teacher Dashboard</h1>

          <div className="grid gap-5 mb-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-[900px]">
            {[
              { key: "viewSessions", img: "../../Images/Session.jpg", label: "Sessions" },
              { key: "viewBatches", img: "../../Images/batch.jpeg", label: "Batches" },
              { key: "viewLeaves", img: "../../Images/leave.jpg", label: "Leaves" },
              { key: "viewLectures", img: "../../Images/lectures.png", label: "Lectures" },
            ].map(({ key, img, label }) => (
              <div
                key={key}
                onClick={() => setActiveTab(key)}
                className={`rounded-2xl p-6 text-center cursor-pointer transition-all font-semibold text-base flex flex-col items-center border-2 border-[#3f51b5] shadow-md hover:bg-[#3f51b5] hover:text-white transform hover:-translate-y-1 ${
                  activeTab === key ? "bg-[#3f51b5] text-white shadow-lg" : "bg-white text-[#3f51b5]"
                }`}
              >
                <img
                  src={img}
                  alt={label}
                  className="w-[70px] h-[70px] mb-3 object-contain rounded-full shadow-md"
                />
                <strong>{label}</strong>
              </div>
            ))}
          </div>

          <div className="w-full max-w-[1000px] bg-white p-10 rounded-3xl shadow-2xl border border-[#dce3f2] transition-transform transform hover:scale-[1.02]">
            {activeTab === "viewSessions" && (
              <>
                <h3 className="text-xl text-[#3f51b5] font-semibold mb-6 border-l-8 border-[#3f51b5] pl-4">🗓️ View Sessions</h3>
                {sessions.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {sessions.map((session, index) => (
                      <div key={session.sessionId || index} className="bg-[#f4f6fc] border border-[#c5cae9] rounded-xl p-5 text-[#1a237e] shadow-md text-sm">
                        <strong className="text-lg">{session.sessionName}</strong>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 text-base p-5">No Session available</div>
                )}
              </>
            )}

            {activeTab === "viewBatches" && (
              <>
                <h3 className="text-xl text-[#3f51b5] font-semibold mb-6 border-l-8 border-[#3f51b5] pl-4">📘 View Batches</h3>
                {batches.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {batches.map((batch, index) => (
                      <div key={batch.batchId || index} className="bg-[#f4f6fc] border border-[#c5cae9] rounded-xl p-5 text-[#1a237e] shadow-md text-sm">
                        <strong className="text-lg">{batch.batch}</strong>
                        <span>🗂️ Course ID: {batch.courseIds}</span>
                        <span>🧮 Strength: {batch.strength}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 text-base p-5">No batches available</div>
                )}
              </>
            )}

            {activeTab === "viewLeaves" && (
              <>
                <h3 className="text-xl text-[#3f51b5] font-semibold mb-6 border-l-8 border-[#3f51b5] pl-4">📝 View Leaves</h3>
                {leaves.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {leaves.map((leave, index) => (
                      <div key={leave.leaveId || index} className="bg-[#f4f6fc] border border-[#c5cae9] rounded-xl p-5 text-[#1a237e] shadow-md text-sm">
                        <strong className="text-lg">{leave.teacherName}</strong>
                        <span>🟢📅 Start Date: {leave.startDate}</span>
                        <span>🔴📅 End Date: {leave.endDate}</span>
                        <span>🗒️ Reason: {leave.reason}</span>
                        <span>🌴🧳 Type: {leave.type}</span>
                        <span>🔄 Status: {leave.status}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 text-base p-5">No leaves available</div>
                )}
              </>
            )}

            {activeTab === "viewLectures" && (
              <>
                <h3 className="text-xl text-[#3f51b5] font-semibold mb-6 border-l-8 border-[#3f51b5] pl-4">🎥 View Lectures</h3>
                {lectures.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {lectures.map((lecture, index) => (
                      <div key={lecture.lectureId || index} className="bg-[#f4f6fc] border border-[#c5cae9] rounded-xl p-5 text-[#1a237e] shadow-md text-sm">
                        <strong className="text-lg">{lecture.title}</strong>
                        <span>🗂️ Course ID: {lecture.courseId}</span>
                        <span>🧑‍🤝‍🧑 Batch ID: {lecture.batchId}</span>
                        <span>
                          ▶️ Lecture:{" "}
                          <a
                            href={lecture.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-500 underline"
                          >
                            {lecture.title}
                          </a>
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 text-base p-5">No lectures available</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;