"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var express = require('express');
var TransactionRoute = express.Router();
var Transaction = require('../models/transaction');
var Block = require('../models/block');
TransactionRoute.get('/transactionsdata', function (req, res) {
  Transaction.find().then(function (transactions) {
    res.json(transactions);
  })["catch"](function (error) {
    res.status(500).json({
      error: 'Failed to fetch transactions'
    });
  });
});
TransactionRoute.get('/blockdata', function (req, res) {
  Block.find().then(function (transactions) {
    res.json(transactions);
  })["catch"](function (error) {
    res.status(500).json({
      error: 'Failed to fetch transactions'
    });
  });
});
var _default = TransactionRoute;
exports["default"] = _default;