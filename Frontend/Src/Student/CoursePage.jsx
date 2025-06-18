import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CoursePage = () => {
  const [course, setCourse] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const getLastPathSegment = (url) => {
    return url.substring(url.lastIndexOf("/") + 1);
  };

  useEffect(() => {
    async function fetchCourseData() {
      const userId = localStorage.getItem("userName");
      const courseId = getLastPathSegment(window.location.href);

      try {
        const response = await fetch(
          `http://localhost:8080/course/${courseId}?studentId=${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch course data");

        const courseData = await response.json();
        setCourse(courseData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCourseData();
  }, []);

  const handleAttemptQuiz = async (quizId) => {
    const userId = localStorage.getItem("userName");
    const courseId = getLastPathSegment(window.location.href);

    try {
      const response = await fetch("http://localhost:8080/grades/attempt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          studentId: userId,
          quizId,
        }),
      });

      if (!response.ok) throw new Error("Failed to record quiz attempt");
      alert("Quiz attempt recorded successfully");
    } catch (error) {
      console.error(error);
    }
  };

  if (!course) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-center text-blue-900 drop-shadow-md mb-8">
        {course.name}
      </h1>

      <div className="flex flex-wrap justify-center gap-6">

        {/* Notices Card */}
        <div
          className="w-80 p-5 rounded-xl shadow-xl bg-gray-100 text-center cursor-pointer transform transition duration-300 hover:scale-105"
          onClick={() => setSelectedCard(selectedCard === "notices" ? null : "notices")}
        >
          <img src="../../Images/notice.jpg" alt="Notices" className="w-full rounded-md mb-3" />
          <h3 className="text-xl font-bold text-gray-700 mb-2">📢 Notices</h3>
          {selectedCard === "notices" && (
            <div className="mt-2 bg-gray-100 p-3 rounded-lg shadow-md">
              {course.notices.map((notice, index) => (
                <div
                  key={index}
                  className="my-2 p-3 rounded-md bg-white shadow-md"
                >
                  <p className="text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-white px-2 py-1 rounded">
                    {notice.title}
                  </p>
                  <p className="text-red-600 font-bold text-sm bg-peach-50 border-l-4 border-red-500 p-2 mt-1 rounded">
                    {notice.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quizzes Card */}
        <div
          className="w-80 p-5 rounded-xl shadow-xl bg-gray-100 text-center cursor-pointer transform transition duration-300 hover:scale-105"
          onClick={() => setSelectedCard(selectedCard === "quizzes" ? null : "quizzes")}
        >
          <img src="../../Images/quize.jpg" alt="Quizzes" className="w-full rounded-md mb-3" />
          <h3 className="text-xl font-bold text-gray-700 mb-2">📝 Quizzes</h3>
          {selectedCard === "quizzes" && (
            <div className="mt-2 bg-gray-100 p-3 rounded-lg shadow-md">
              {course.quizzes.map((quiz, index) => (
                <div
                  key={index}
                  className="my-2 p-3 rounded-md bg-white shadow-md"
                >
                  <p className="text-lg font-bold text-blue-900 underline mb-2">{quiz.title}</p>
                  <button
                    onClick={() => handleAttemptQuiz(quiz.quizId)}
                    className="bg-blue-500 text-white px-4 py-2 rounded font-semibold mb-2 hover:bg-blue-600"
                  >
                    Attempt Quiz
                  </button>
                  <p>Grade: {quiz.grade}</p>
                  <p>Quiz Time: {quiz.time}</p>
                  {quiz.grade && (
                    <p className="font-bold text-green-600">Graded marks: {quiz.gradedMarks}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lectures Card */}
        <div
          className="w-80 p-5 rounded-xl shadow-xl bg-gray-100 text-center cursor-pointer transform transition duration-300 hover:scale-105"
          onClick={() => setSelectedCard(selectedCard === "lectures" ? null : "lectures")}
        >
          <img src="../../Images/online.jpg" alt="Lectures" className="w-full rounded-md mb-3" />
          <h3 className="text-xl font-bold text-gray-700 mb-2">🎥 Lectures</h3>
          {selectedCard === "lectures" && (
            <div className="mt-2 bg-gray-100 p-3 rounded-lg shadow-md">
              {course.lectures.length > 0 ? (
                course.lectures.map((lecture, index) => (
                  <div
                    key={index}
                    className="my-2 p-3 rounded-md bg-white shadow-md"
                  >
                    <p className="text-lg font-bold text-teal-700">{lecture.title || "Untitled Lecture"}</p>
                    {lecture.videoUrl ? (
                      <a
                        href={lecture.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 font-bold underline"
                      >
                        ▶️ Watch Lecture
                      </a>
                    ) : (
                      <p className="text-gray-500">No video available</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-red-600">No lectures available</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="text-center mt-6">
        <Link
          to="/course"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition"
        >
          🔙 Back
        </Link>
      </div>
    </div>
  );
};

export default CoursePage;