// batchModel.cjs
const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    batchId: String,
    batchName: String,
    strength: Number,
    courseIds: [String]
});

const BatchData = mongoose.model('Batch', batchSchema);
module.exports = BatchData;
