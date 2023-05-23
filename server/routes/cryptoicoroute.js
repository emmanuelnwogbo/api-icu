const express = require('express');
const ExtractedDataRoute = express.Router();
const CryptoIco = require('../models/cryptoico');

ExtractedDataRoute.post('/extracted-data', async (req, res) => {
  try {
    // Extract data from the request body
    const { Name, DateFrom, DateTo, PeriodValue, Label, Raised, DataDirect } = req.body;

    // Create a new instance of the ExtractedData model
    const cryptoIco = new CryptoIco({
      Name,
      DateFrom,
      DateTo,
      PeriodValue,
      Label,
      Raised,
      DataDirect
    });

    await cryptoIco.save();

    res.status(201).json({ message: 'Extracted data created successfully', data: cryptoIco });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create extracted data' });
  }
});

ExtractedDataRoute.get('/extracted-data', async (req, res) => {
  try {
    const extractedData = await CryptoIco.find();
    res.json(extractedData);
  } catch (error) {
    console.error('Failed to fetch extracted data:', error);
    res.status(500).json({ error: 'Failed to fetch extracted data' });
  }
});

export default ExtractedDataRoute;
