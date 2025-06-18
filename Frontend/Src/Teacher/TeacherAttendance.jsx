import React, { useState, useEffect } from "react";
import CourseBatchTab from "./CourseBatchTab";
import axios from "axios";

export default function TeacherAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const teacherId = localStorage.getItem("userName");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/teacher/courses", {
        params: { teacherId },
      });
      const courses = response.data;

      const updatedCourses = await Promise.all(
        courses.map(async (course) => {
          const batchesResponse = await axios.get("http://localhost:8080/teacher/batches", {
            params: { teacherId },
          });

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

  const updateStudentAttendance = async (courseId, batchId, studentId, present) => {
    try {
      await axios.put(`http://localhost:8080/attendance/${courseId}/${batchId}/${studentId}`, {
        present,
      });

      setAttendanceData((prevData) =>
        prevData.map((course) => {
          if (course.courseId === courseId) {
            return {
              ...course,
              batches: course.batches.map((batch) => {
                if (batch.batchId === batchId) {
                  const updatedStudents = batch.students.map((student) =>
                    student.studentId === studentId ? { ...student, present } : student
                  );
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
    <div className="w-full mx-auto my-10 p-6 rounded-xl bg-[#fefefe] border border-gray-200 shadow-lg transition-all duration-300 h-168 mt-15">
        <h4 className="text-4xl font-bold m-10 text-center underline">📊 Attendance Dashboard</h4>

      <div className="p-4 bg-white rounded-lg shadow">
        {attendanceData.length > 0 ? (
          attendanceData.map((course, index) => (
            <CourseBatchTab
              key={index}
              course={course}
              updateStudentAttendance={updateStudentAttendance}
            />
          ))
        ) : (
          <p className="text-center text-base text-gray-500 italic py-4">
            No attendance data available.
          </p>
        )}
      </div>
    </div>
  );
}