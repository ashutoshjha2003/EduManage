// studentModel.cjs
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId: String,
    studentName: String,
    batch: String,
    password: String,
    studentEmail: String
});

const StudentData = mongoose.model('studentdata', studentSchema); 
module.exports = StudentData;
