const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    courseId: String,
    batchId: String,
    title: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
});

const NoticeData = mongoose.model('noticedata', noticeSchema);
module.exports = NoticeData;