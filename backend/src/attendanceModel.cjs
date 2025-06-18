const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    courseId: String,
    batchId: String,
    students: [
        {
            studentName: String,
            studentId: String,
            present: { type: Number, default: 0 }
        }
    ]
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;