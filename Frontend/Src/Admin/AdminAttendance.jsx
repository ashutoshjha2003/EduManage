import React from "react";
import { useState, useEffect } from "react";
import CourseBatchTab from "./admincoursebatchtab";
import axios from "axios";

export default function AdminAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/courses");
      const courses = response.data;

      const updatedCourses = await Promise.all(
        courses.map(async (course) => {
          const batchesResponse = await axios.get(
            "http://localhost:8080/batches"
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

      setAttendanceData(updatedCourses);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const updateStudentAttendance = async (
    courseId,
    batchId,
    studentId,
    present
  ) => {
    try {
      await axios.put(
        `http://localhost:8080/attendance/${courseId}/${batchId}/${studentId}`,
        { present }
      );
      setAttendanceData((prevData) =>
        prevData.map((course) => {
          if (course.courseId === courseId) {
            return {
              ...course,
              batches: course.batches.map((batch) => {
                if (batch.batchId === batchId) {
                  const updatedStudents = batch.students.map((student) => {
                    if (student.studentId === studentId) {
                      return { ...student, present };
                    }
                    return student;
                  });
                  return { ...batch, students: updatedStudents };
                }
                return batch;
              }),
            };
          }
          return course;
        })
      );
    } catch (error) {
      console.error("Error updating student attendance:", error);
    }
  };

  return (
    <div className="mx-auto mt-10 font-sans">
      <div className="bg-[#f0f4ff] p-6 rounded-xl m-2 mt-17 h-181 w-500vh">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#2c3e50] underline">
            📊 Attendance Dashboard
          </h1>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {attendanceData.map((course, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl shadow-lg transition-all border border-gray-200"
            >
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white mb-5 flex flex-col gap-1.5">
                <div className="text-lg font-semibold">{course.courseName}</div>
                <div className="text-sm opacity-90">
                  <strong>Course ID:</strong> {course.courseId}
                </div>
                <div className="text-sm opacity-90">
                  <strong>Duration:</strong> {course.duration}
                </div>
              </div>

              <CourseBatchTab
                course={course}
                updateStudentAttendance={updateStudentAttendance}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
