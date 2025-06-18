
// teacherModel.cjs
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    teacherId: String,
    teacherName: String,
    courseId: String,
    teacherEmail: String,
    password: String,
    batchIds: [String],

});

const TeacherData = mongoose.model('teacherdata', teacherSchema); 
module.exports = TeacherData;
