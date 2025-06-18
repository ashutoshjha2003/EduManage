const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    batchId: String,
    courseName: String,  // Directly saving courseName
    day: String,
    room: String,
    startTime: String,
    teacherName: String, // Directly saving teacherName
    teacherId: String,
    lastUpdated: { type: Date, default: Date.now }
});

const TimetableData = mongoose.model('Timetable', timetableSchema);
module.exports = TimetableData;
