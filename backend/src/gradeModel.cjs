const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    courseId: String,
    batchId: String,
    studentId: String,
    quizId: String,
    grade: String,
    gradedMarks: String,
});

const GradeData = mongoose.model('gradedata', gradeSchema);
module.exports = GradeData;