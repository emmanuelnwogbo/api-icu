const mongoose = require('mongoose');

const PopulationSchema = new mongoose.Schema({
    data: { type: Object, required: true },
    dataGroup: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    randomId: { type: String, required: true }
});

const Population = mongoose.model('Population', PopulationSchema);

module.exports = Population;