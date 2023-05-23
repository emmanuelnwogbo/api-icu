"use strict";

var _require = require("mongoose"),
  mongoose = _require["default"];
var TransactionSchema = new mongoose.Schema({
  blockHash: {
    type: Array,
    required: true
  },
  blockNumber: {
    type: Array,
    required: true
  },
  hash: {
    type: Array,
    required: true
  },
  chainId: {
    type: Array,
    required: true
  },
  from: {
    type: Array,
    required: true
  },
  gas: {
    type: Array,
    required: true
  },
  gasPrice: {
    type: Array,
    required: true
  },
  input: {
    type: Array,
    required: true
  },
  nonce: {
    type: Array,
    required: true
  },
  r: {
    type: Array,
    required: true
  },
  s: {
    type: Array,
    required: true
  },
  to: {
    type: Array,
    required: true
  },
  transactionIndex: {
    type: Array,
    required: true
  },
  type: {
    type: Array,
    required: true
  },
  v: {
    type: Array,
    required: true
  },
  value: {
    type: Array,
    required: true
  },
  timestamp: {
    type: Date,
    "default": Date.now
  }
});
var Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;