const mongoose = require('mongoose');

const BlockSchema = new mongoose.Schema({
    data: { type: Object, required: true },
    transactions: {
        type: Array,
        required: true
    },
    withdrawals: {
        type: Array,
        required: true
    },
    dataGroup: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    randomId: { type: String, required: true }
});

const Block = mongoose.model('Block', BlockSchema);

module.exports = Block;