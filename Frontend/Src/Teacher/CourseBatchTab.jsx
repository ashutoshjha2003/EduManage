import React, { useState, useEffect } from 'react';
import StudentAttendance from './TeacherAttendaceTemplate';

const CourseBatchTab = ({ course, updateStudentAttendance }) => {
  const [activeBatch, setActiveBatch] = useState(null);
  const [localStudents, setLocalStudents] = useState({});

  useEffect(() => {
    const initialLocalStudents = {};
    course.batches.forEach(batch => {
      initialLocalStudents[batch.batchId] = batch.students;
    });
    setLocalStudents(initialLocalStudents);
  }, [course.batches]);

  const toggleBatch = (batchId) => {
    setActiveBatch(activeBatch === batchId ? null : batchId);
  };

  const handlePresentChange = (batchId, studentId, event) => {
    const presentValue = parseInt(event.target.value);
    if (!isNaN(presentValue)) {
      const updatedStudents = localStudents[batchId].map(student =>
        student.studentId === studentId
          ? { ...student, present: presentValue }
          : student
      );
      setLocalStudents({ ...localStudents, [batchId]: updatedStudents });
      updateStudentAttendance(course.courseId, batchId, studentId, presentValue);
    }
  };

  return (
    <div className="w-full p-6 mb-8 bg-white/10 rounded-xl shadow-md backdrop-blur-md border border-gray-300">
      {/* Course Header */}
      <div className="mb-4 text-center">
        <h5 className="text-lg font-bold text-black">
          {course.courseName} ({course.courseId})
        </h5>
        <p className="font-semibold text-gray-800">{course.duration}</p>
      </div>

      {/* Batch Tabs */}
      <div className="space-y-4">
        {course.batches.map(batch => (
          <div key={batch._id} className="rounded-lg border border-gray-300 p-4 bg-white/20">
            <button
              onClick={() => toggleBatch(batch.batchId)}
              className="w-full text-left font-bold text-black bg-indigo-200 hover:bg-indigo-300 px-4 py-2 rounded-md shadow-sm transition-all duration-200"
            >
              {batch.batchName} {activeBatch === batch.batchId ? '-' : '+'}
            </button>

            {activeBatch === batch.batchId && (
              <div className="mt-4">
                <StudentAttendance
                  students={localStudents[batch.batchId] || batch.students}
                  courseId={course.courseId}
                  batchId={batch.batchId}
                  total={course.duration}
                  handlePresentChange={(studentId, event) =>
                    handlePresentChange(batch.batchId, studentId, event)
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseBatchTab;