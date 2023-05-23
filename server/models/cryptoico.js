const mongoose = require('mongoose');

const CryptoIcoSchema = new mongoose.Schema({
  Name: String,
  DateFrom: String,
  DateTo: String,
  PeriodValue: String,
  Label: String,
  Raised: String,
  DataDirect: String,
  About: String,
  Additional_details: String,
});

const CryptoIco = mongoose.model('CryptoIco', CryptoIcoSchema);

module.exports = CryptoIco;
