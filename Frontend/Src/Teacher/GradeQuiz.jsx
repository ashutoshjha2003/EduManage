import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GradeQuiz = () => {
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [grades, setGrades] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const teacherId = localStorage.getItem('userName');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/teacher/courses', {
          params: { teacherId },
        });
        setCourses(response.data);
        if (response.data.length > 0) setSelectedCourse(response.data[0].courseId);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, [teacherId]);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        if (selectedCourse) {
          const response = await axios.get('http://localhost:8080/teacher/batches', {
            params: { teacherId },
          });
          const filteredBatches = response.data.filter(batch =>
            batch.courseIds.includes(selectedCourse)
          );
          setBatches(filteredBatches);
          if (filteredBatches.length > 0) setSelectedBatch(filteredBatches[0].batchId);
        }
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    };
    fetchBatches();
  }, [teacherId, selectedCourse]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        if (selectedCourse && selectedBatch) {
          const response = await axios.get('http://localhost:8080/quizzes', {
            params: { courseId: selectedCourse, batchId: selectedBatch },
          });
          setQuizzes(response.data);
          const initialGrades = response.data.flatMap(quiz =>
            quiz.students.map(student => ({
              quizId: quiz.quizId,
              studentId: student.studentId,
              grade: student.grade || quiz.grade,
              gradedMarks: student.gradedMarks || '',
            }))
          );
          setGrades(initialGrades);
        }
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
    fetchQuizzes();
  }, [selectedCourse, selectedBatch]);

  const handleGradeChange = (quizId, studentId, value) => {
    setGrades(
      grades.map(grade =>
        grade.quizId === quizId && grade.studentId === studentId
          ? { ...grade, grade: value }
          : grade
      )
    );
  };

  const handleGradedMarksChange = (quizId, studentId, value) => {
    setGrades(
      grades.map(grade =>
        grade.quizId === quizId && grade.studentId === studentId
          ? { ...grade, gradedMarks: value }
          : grade
      )
    );
  };

  const handleAddGrade = async () => {
    try {
      await axios.post('http://localhost:8080/grades', {
        courseId: selectedCourse,
        batchId: selectedBatch,
        grades,
      });
      console.log('Grades added successfully');
      setGrades([]);
    } catch (error) {
      console.error('Error adding grades:', error);
    }
  };

  return (
    <div className="bg-white/20 backdrop-blur-md shadow-lg border border-white/30 p-8 rounded-2xl w-[90%] max-w-2xl mx-auto mt-12 text-center">
      <h2 className="text-white text-2xl font-bold mb-6 drop-shadow">📊 Grade Quizzes</h2>

      <select
        className="block w-full p-3 mb-4 rounded-xl border-none text-base text-center bg-white/30 text-gray-800 outline-none"
        onChange={(e) => setSelectedCourse(e.target.value)}
        value={selectedCourse}
      >
        {courses.map(course => (
          <option key={course.courseId} value={course.courseId}>
            {course.courseName}
          </option>
        ))}
      </select>

      <select
        className="block w-full p-3 mb-6 rounded-xl border-none text-base text-center bg-white/30 text-gray-800 outline-none"
        onChange={(e) => setSelectedBatch(e.target.value)}
        value={selectedBatch}
      >
        {batches.map(batch => (
          <option key={batch.batchId} value={batch.batchId}>
            {batch.batchName}
          </option>
        ))}
      </select>

      {quizzes.map(quiz => (
        <div key={quiz.quizId} className="bg-white/30 text-gray-800 p-4 mb-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold mb-4">{quiz.quizName}</h3>

          {quiz.students.map(student => (
            <div
              key={student.studentId}
              className="flex items-center justify-between gap-4 mb-3 flex-nowrap"
            >
              <h4 className="text-sm font-semibold text-gray-800 min-w-[80px]">{student.studentId}</h4>

              <input
                type="text"
                placeholder={quiz.grade}
                value={
                  grades.find(g => g.quizId === quiz.quizId && g.studentId === student.studentId)?.grade ||
                  ''
                }
                onChange={(e) =>
                  handleGradeChange(quiz.quizId, student.studentId, e.target.value)
                }
                className="flex-1 p-2 rounded-md bg-white/40 text-center text-gray-800 outline-none min-w-[80px]"
              />

              <input
                type="text"
                placeholder="Graded Marks"
                value={
                  grades.find(g => g.quizId === quiz.quizId && g.studentId === student.studentId)
                    ?.gradedMarks || ''
                }
                onChange={(e) =>
                  handleGradedMarksChange(quiz.quizId, student.studentId, e.target.value)
                }
                className="flex-1 p-2 rounded-md bg-white/40 text-center text-gray-800 outline-none min-w-[80px]"
              />
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={handleAddGrade}
        className="w-full py-3 mt-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold rounded-xl text-lg hover:scale-[1.02] transition-all duration-200"
      >
        ✔️ Add Grades
      </button>
    </div>
  );
};

export default GradeQuiz;