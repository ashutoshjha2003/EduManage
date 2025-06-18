const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
    lectureId: String,
    courseId: String,
    batchId: String,
    teacherId: String,
    teacherName: String,
    title: String,
    description: String,
    videoUrl: String,
    createdAt: { type: Date, default: Date.now },
});

const LectureData = mongoose.model('lecturedata', lectureSchema);
module.exports = LectureData;