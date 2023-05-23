"use strict";

var mongoose = require('mongoose');
var PopulationSchema = new mongoose.Schema({
  data: {
    type: Object,
    required: true
  },
  dataGroup: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    "default": Date.now
  },
  randomId: {
    type: String,
    required: true
  }
});
var Population = mongoose.model('Population', PopulationSchema);
module.exports = Population;