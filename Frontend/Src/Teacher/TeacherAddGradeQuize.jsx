import React, { useState, useEffect } from "react";
import axios from "axios";
import GradeQuiz from "./GradeQuiz";

const TeacherAddGradeQuize = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const teacherId = localStorage.getItem("userName");

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/teacher/courses",
          {
            params: { teacherId },
          }
        );
        const courses = response.data;

        const updatedCourses = await Promise.all(
          courses.map(async (course) => {
            const batchesResponse = await axios.get(
              "http://localhost:8080/teacher/batches",
              {
                params: { teacherId },
              }
            );

            const batches = batchesResponse.data.filter((batch) =>
              batch.courseIds.includes(course.courseId)
            );

            const updatedBatches = await Promise.all(
              batches.map(async (batch) => {
                const studentsResponse = await axios.get(
                  `http://localhost:8080/studentsattendance?courseId=${course.courseId}&batchId=${batch.batchId}`
                );
                const students = studentsResponse.data;
                return { ...batch, students };
              })
            );

            return { ...course, batches: updatedBatches };
          })
        );

        setCourses(updatedCourses);
        if (updatedCourses.length > 0) {
          setSelectedCourse(updatedCourses[0].courseId);
          setBatches(updatedCourses[0].batches);
          if (updatedCourses[0].batches.length > 0) {
            setSelectedBatch(updatedCourses[0].batches[0].batchId);
          }
        }
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };

    fetchTeacherData();
  }, []);

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);
    const selectedCourse = courses.find((c) => c.courseId === courseId);
    if (selectedCourse) {
      setBatches(selectedCourse.batches);
      setSelectedBatch(selectedCourse.batches[0]?.batchId || "");
    }
  };

  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
  };

  const getButtonStyle = (active) =>
    `w-full p-4 text-sm font-bold rounded-xl shadow-md transition-all duration-300 
     ${
       active
         ? "bg-yellow-500 text-white"
         : "bg-yellow-100 text-black hover:bg-yellow-200"
     }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white p-6 md:p-12 text-black ">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-black mb-2 mt-10">
          🎓 Welcome, Faculty
        </h1>
        <p className="text-gray-700">
          Manage your courses, quizzes, lectures and more
        </p>
      </div>

      {/* Dropdowns */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-8 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-black mb-1 block">
              📘 Select Course
            </label>
            <select
              value={selectedCourse}
              onChange={handleCourseChange}
              className="w-full px-4 py-3 border rounded-lg bg-gray-50 text-black shadow-sm"
            >
              {courses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-black mb-1 block">
              🏫 Select Batch
            </label>
            <select
              value={selectedBatch}
              onChange={handleBatchChange}
              className="w-full px-4 py-3 border rounded-lg bg-gray-50 text-black shadow-sm"
            >
              {batches.map((batch) => (
                <option key={batch.batchId} value={batch.batchId}>
                  {batch.batchName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8 ">
        <button
          onClick={() => setActiveTab("grade")}
          className={getButtonStyle(activeTab === "grade")}
        >
          📄 Add Grade Quize
        </button>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 transition-all duration-500 text-black">
        {activeTab === 'grade' && <GradeQuiz courseId={selectedCourse} batchId={selectedBatch} />}
      </div>
    </div>
  );
};

export default TeacherAddGradeQuize;
