const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    leaveId: String,
    teacherId: String,
    teacherName: String,
    startDate: String,
    endDate: String,
    type: String,
    reason: String,
    status: String,
});

const LeaveData = mongoose.model('leaveData', leaveSchema);
module.exports = LeaveData;