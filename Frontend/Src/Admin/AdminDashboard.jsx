import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Courses");
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (activeTab === 'viewCourses') fetchCourses();
    else if (activeTab === 'viewBatches') fetchBatches();
    else if (activeTab === 'viewStudents') fetchStudents();
    else if (activeTab === 'viewTeachers') fetchTeachers();
  }, [activeTab]);

  const fetchCourses = async () => {
    try {
      const res = await fetch('http://localhost:8080/courses');
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error('Failed to fetch Course:', error);
    }
  };

  const fetchBatches = async () => {
    try {
      const res = await fetch('http://localhost:8080/batches');
      const data = await res.json();
      setBatches(data);
    } catch (error) {
      console.error('Failed to fetch Batches:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:8080/students');
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch Students:', error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await fetch('http://localhost:8080/teachers');
      const data = await res.json();
      setTeachers(data);
    } catch (error) {
      console.error('Failed to fetch Teachers:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-start "> {/*change*/}
      <div className="w-full max-w-[1400px] p-50">
          <h1 className="text-4xl font-bold text-[#2c3e50] mb-8 text-center">Admin Dashboard</h1>

          {/* Tab Navigation */}
          <div className="grid gap-5 grid-cols-2 sm:grid-cols-4 max-w-4xl w-full mb-12">
            {[
              { id: 'viewCourses', label: 'Courses', img: '../../Images/course details.jpg' },
              { id: 'viewBatches', label: 'Batches', img: '../../Images/batch.jpeg' },
              { id: 'viewStudents', label: 'Students', img: '../../Images/Students.png' },
              { id: 'viewTeachers', label: 'Faculty', img: '../../Images/Teachers.png' }
            ].map(tab => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer text-center p-6 rounded-2xl border-2 font-semibold text-base flex flex-col items-center transition-all duration-300 hover:bg-[#3f51b5] hover:text-white ${
                  activeTab === tab.id
                    ? 'bg-[#3f51b5] text-white shadow-lg'
                    : 'bg-white text-[#3f51b5] border-[#3f51b5]'
                }`}
              >
                <img src={tab.img} alt={tab.label} className="w-16 h-16 rounded-full mb-3 object-contain shadow-md" />
                <strong>{tab.label}</strong>
              </div>
            ))}
          </div>

          {/* Content Panel */}
          <div className="w-full max-w-5xl bg-white p-10 rounded-3xl shadow-xl border border-[#dce3f2] transition-transform duration-300 hover:scale-[1.02]">
            {/* View Courses */}
            {activeTab === 'viewCourses' && (
              <>
                <h3 className="text-2xl font-semibold text-[#3f51b5] mb-6 border-l-4 border-[#3f51b5] pl-4">
                  💻📘 View Courses
                </h3>
                {courses.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map(course => (
                      <div
                        key={course.courseId}
                        className="bg-[#f4f6fc] p-5 rounded-xl border border-[#c5cae9] shadow-md text-[#1a237e] text-sm flex flex-col gap-2"
                      >
                        <strong className="text-lg">{course.courseName}</strong>
                        <span>🗂️ Course ID: {course.courseId}</span>
                        <span>⏳ Duration: {course.duration}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 text-base p-5">No courses available</p>
                )}
              </>
            )}

            {/* View Batches */}
            {activeTab === 'viewBatches' && (
              <>
                <h3 className="text-2xl font-semibold text-[#3f51b5] mb-6 border-l-4 border-[#3f51b5] pl-4">
                  📘 View Batches
                </h3>
                {batches.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {batches.map(batch => (
                      <div
                        key={batch.batchId}
                        className="bg-[#f4f6fc] p-5 rounded-xl border border-[#c5cae9] shadow-md text-[#1a237e] text-sm flex flex-col gap-2"
                      >
                        <strong className="text-lg">{batch.batchName}</strong>
                        <span>🧑‍🤝‍🧑 Batch ID: {batch.batchId}</span>
                        <span>🗂️ Course ID: {batch.courseIds}</span>
                        <span>🧮 Strength: {batch.strength}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 text-base p-5">No batches available</p>
                )}
              </>
            )}

            {/* View Students */}
            {activeTab === 'viewStudents' && (
              <>
                <h3 className="text-2xl font-semibold text-[#3f51b5] mb-6 border-l-4 border-[#3f51b5] pl-4">
                  🧑‍🎓 View Students
                </h3>
                {students.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {students.map(student => (
                      <div
                        key={student.studentId}
                        className="bg-[#f4f6fc] p-5 rounded-xl border border-[#c5cae9] shadow-md text-[#1a237e] text-sm flex flex-col gap-2"
                      >
                        <strong className="text-lg">{student.studentName}</strong>
                        <span>🆔 Student ID: {student.studentId}</span>
                        <span>🧑‍🤝‍🧑 Batch ID: {student.batch}</span>
                        <span>📧 Email ID: {student.studentEmail}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 text-base p-5">No students available</p>
                )}
              </>
            )}

            {/* View Teachers */}
            {activeTab === 'viewTeachers' && (
              <>
                <h3 className="text-2xl font-semibold text-[#3f51b5] mb-6 border-l-4 border-[#3f51b5] pl-4">
                  🧑‍🏫 View Teachers
                </h3>
                {teachers.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teachers.map(teacher => (
                      <div
                        key={teacher.teacherId}
                        className="bg-[#f4f6fc] p-5 rounded-xl border border-[#c5cae9] shadow-md text-[#1a237e] text-sm flex flex-col gap-2"
                      >
                        <strong className="text-lg">{teacher.teacherName}</strong>
                        <span>🧑‍🤝‍🧑 Batch ID: {teacher.batchIds}</span>
                        <span>🆔 Teacher ID: {teacher.teacherId}</span>
                        <span>📧 Email ID: {teacher.teacherEmail}</span>
                        <span>🗂️ Course ID: {teacher.courseId}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 text-base p-5">No teachers available</p>
                )}
              </>
            )}
          </div>
      </div>
    </div>
  );
};

export default AdminDashboard;