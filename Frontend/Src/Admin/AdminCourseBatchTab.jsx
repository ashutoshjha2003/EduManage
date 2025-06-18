import React, { useState, useEffect } from 'react';
import StudentAttendance from './AdminAttendanceTemplate';
import { FaFlask, FaChevronDown, FaChevronUp } from 'react-icons/fa';

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
    <div className="py-3">
      {course.batches.map(batch => (
        <div key={batch.batchId} className="mb-4">
          <button
            onClick={() => toggleBatch(batch.batchId)}
            className="w-full flex items-center justify-between px-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md transition-transform duration-200 hover:scale-[1.01]"
          >
            <div className="flex items-center gap-2">
              <FaFlask className="text-lg" />
              {batch.batchName}
            </div>
            {activeBatch === batch.batchId ? (
              <FaChevronUp className="text-lg" />
            ) : (
              <FaChevronDown className="text-lg" />
            )}
          </button>

          {activeBatch === batch.batchId && (
            <StudentAttendance
              students={localStudents[batch.batchId] || batch.students}
              batchId={batch.batchId}
              total={course.duration}
              handlePresentChange={(studentId, event) =>
                handlePresentChange(batch.batchId, studentId, event)
              }
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseBatchTab;