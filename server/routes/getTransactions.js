const express = require('express');
const TransactionRoute = express.Router();
const Transaction = require('../models/transaction');
const Block = require('../models/block');

TransactionRoute.get('/transactionsdata', (req, res) => {
    Transaction.find()
        .then((transactions) => {
            res.json(transactions);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to fetch transactions' });
        });
});

TransactionRoute.get('/blockdata', (req, res) => {
    Block.find()
        .then((transactions) => {
            res.json(transactions);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to fetch transactions' });
        });
});

export default TransactionRoute;