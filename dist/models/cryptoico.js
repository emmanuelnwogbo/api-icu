"use strict";

var mongoose = require('mongoose');
var CryptoIcoSchema = new mongoose.Schema({
  Name: String,
  DateFrom: String,
  DateTo: String,
  PeriodValue: String,
  Label: String,
  Raised: String,
  DataDirect: String,
  About: String,
  Additional_details: String
});
var CryptoIco = mongoose.model('CryptoIco', CryptoIcoSchema);
module.exports = CryptoIco;