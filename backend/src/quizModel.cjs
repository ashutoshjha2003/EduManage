const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    courseId: String,
    batchId: String,
    quizId: String,
    quizName: String,
    quizTime: String,
    grade: String,
    link: String,
    createdAt: { type: Date, default: Date.now }
});

const QuizData = mongoose.model('quizdata', quizSchema);
module.exports = QuizData;