// courseModel.cjs
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseId: String,
    courseName: String,
    duration: String,
});

const CourseData = mongoose.model('Course', courseSchema);
module.exports = CourseData;
