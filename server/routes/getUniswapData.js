const express = require('express');
const GetUniswapData = express.Router();
const Population = require('../models/population');

GetUniswapData.get('/uniswap/:dataGroup', async (req, res) => {
  try {
    const { dataGroup } = req.params;
    const items = await Population.find({ dataGroup });
    res.json(items);
  } catch (error) {
    console.error('Failed to fetch items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

export default GetUniswapData;